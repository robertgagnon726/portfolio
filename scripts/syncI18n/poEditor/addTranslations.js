import axios from 'axios';

/**
 * Attach translations to existing terms using /v2/translations/add.
 * @param {string} apiToken
 * @param {number|string} projectId
 * @param {string} language - e.g. "en-us", "es"
 * @param {Array} translations - array of { term, translation: { content: 'some text' }}
 */
export async function addTranslations(apiToken, projectId, language, translations) {
  const url = 'https://api.poeditor.com/v2/translations/add';
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
    throw new Error(`Failed to add translations to POEditor: ${JSON.stringify(data, null, 2)}`);
  }
  return data;
}
