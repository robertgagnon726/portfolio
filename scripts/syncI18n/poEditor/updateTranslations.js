import axios from 'axios';

/**
 * Update translations for existing terms in a specific language.
 * If the term doesn't exist, POEditor won't create it here; you must
 * ensure the term already exists in the project.
 *
 * @param {string} apiToken - POEditor API token
 * @param {string|number} projectId - POEditor project ID
 * @param {string} language - e.g. "en-us", "es", "fr"
 * @param {Array} translations - array of objects:
 *   [
 *     {
 *       term: 'HomePage.title',
 *       context: null, // if needed
 *       translation: { content: 'Hello world!' }
 *     },
 *     ...
 *   ]
 * @returns {Promise<Object>} The raw JSON response from POEditor
 */
export async function updateTranslations(apiToken, projectId, language, translations) {
  const url = 'https://api.poeditor.com/v2/translations/update';

  const formParams = new URLSearchParams({
    api_token: apiToken,
    id: String(projectId),
    language,
    data: JSON.stringify(translations),
  });

  const { data } = await axios.post(url, formParams.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!data || data.response.status !== 'success') {
    throw new Error(`Failed to update translations in POEditor: ${JSON.stringify(data, null, 2)}`);
  }

  return data; // e.g. { response: { status: 'success', ... }, result: {...} }
}
