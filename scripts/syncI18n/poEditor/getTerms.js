import axios from 'axios';

/**
 * Fetch all existing terms from the POEditor project.
 *
 * @param {string} apiToken - The POEditor API token
 * @param {string|number} projectId - The numeric ID of the POEditor project
 * @returns {Promise<Array>} an array of term objects, e.g. [{ term: 'HomePage.title', context: null, plural: null, reference: null }, ...]
 */
export async function getTerms(apiToken, projectId) {
  const url = 'https://api.poeditor.com/v2/terms/list';

  // Build form-encoded params for POST
  const formParams = new URLSearchParams({
    api_token: apiToken,
    id: String(projectId),
  });

  const { data } = await axios.post(url, formParams.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // If the request wasn't successful, throw an error
  if (!data || data.response.status !== 'success') {
    throw new Error(`Failed to list terms from POEditor: ${JSON.stringify(data, null, 2)}`);
  }

  // data.result.terms is the array of terms
  return data.result.terms || [];
}
