import axios from 'axios';

/**
 * Remove terms from POEditor.
 * @param {string} apiToken
 * @param {number|string} projectId
 * @param {Array<string>} termKeys - array of term strings
 */
export async function removeTerms(apiToken, projectId, termKeys) {
  const url = 'https://api.poeditor.com/v2/terms/delete';
  const termsData = termKeys.map((t) => ({ term: t }));
  const formParams = new URLSearchParams({
    api_token: apiToken,
    id: String(projectId),
    data: JSON.stringify(termsData),
  });

  const { data } = await axios.post(url, formParams.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!data || data.response.status !== 'success') {
    throw new Error(`Failed to remove terms from POEditor: ${JSON.stringify(data, null, 2)}`);
  }
  return data;
}
