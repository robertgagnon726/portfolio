import axios from 'axios';

/**
 * Add new terms to POEditor using /v2/terms/add.
 * @param {string} apiToken
 * @param {number|string} projectId
 * @param {Array} terms - array of { term: string }, no translations
 */
export async function addTerms(apiToken, projectId, terms) {
  const url = 'https://api.poeditor.com/v2/terms/add';
  const formParams = new URLSearchParams({
    api_token: apiToken,
    id: String(projectId),
    data: JSON.stringify(terms),
  });

  const { data } = await axios.post(url, formParams.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!data || data.response.status !== 'success') {
    throw new Error(`Failed to add terms to POEditor: ${JSON.stringify(data, null, 2)}`);
  }
  return data;
}
