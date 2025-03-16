import axios from 'axios';

/**
 * Use POEditor machine translation.
 * @param {string} apiToken
 * @param {number|string} projectId
 * @param {string} sourceLanguage
 * @param {Array<{ project_language: string; provider_language: string }>} targetLanguages
 */
export async function automaticTranslate(apiToken, projectId, sourceLanguage, targetLanguages) {
  const url = 'https://api.poeditor.com/v2/translations/automatic';

  // POEditor expects this data in a JSON or form body
  const body = new URLSearchParams({
    api_token: apiToken,
    id: String(projectId),
    source_language: sourceLanguage,
    provider_source_language: providerLanguageMap[sourceLanguage],
    provider: 'google',
    target_languages: JSON.stringify(targetLanguages),
  });

  const { data } = await axios.post(url, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!data || data.response.status !== 'success') {
    throw new Error(`Failed to do automatic translation: ${JSON.stringify(data, null, 2)}`);
  }
  return data;
}

const providerLanguageMap = {
  'en-us': 'en',
};
