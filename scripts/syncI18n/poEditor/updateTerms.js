import axios from 'axios';

/**
 * Update existing terms in the POEditor project.
 * By default, it only updates terms that already exist. If you want
 * to add missing terms at the same time, pass `sync = true`.
 *
 * @param {string} apiToken - The POEditor API token
 * @param {string|number} projectId - The POEditor project ID
 * @param {Array} terms - Array of term objects, e.g.:
 *   [
 *     { term: 'HomePage.title', context: null, plural: null, reference: null, comment: null },
 *     { term: 'HomePage.about', context: null, ... }
 *   ]
 * @param {boolean} [sync=false] - If `true`, use `sync_terms=1` so missing terms are created too
 * @returns {Promise<Object>} The raw JSON response from POEditor
 */
export async function updateTerms(apiToken, projectId, terms, sync = false) {
  const url = 'https://api.poeditor.com/v2/terms/update';

  const formParams = new URLSearchParams({
    api_token: apiToken,
    id: String(projectId),
    data: JSON.stringify(terms),
  });

  // If you pass sync=true, it will add new terms that don't already exist
  if (sync) {
    formParams.set('sync_terms', '1');
  }

  const { data } = await axios.post(url, formParams.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!data || data.response.status !== 'success') {
    throw new Error(`Failed to update terms in POEditor: ${JSON.stringify(data, null, 2)}`);
  }

  return data; // e.g. { response: { status: 'success', ... }, result: {...} }
}
