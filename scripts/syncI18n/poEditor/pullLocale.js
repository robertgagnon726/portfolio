import axios from 'axios';
import fs from 'fs';

/**
 * Download the target locale from POEditor and write it to local JSON.
 */
export async function pullLocaleFromPoEditor(apiToken, projectId, language, filePath) {
  const exportUrl = 'https://api.poeditor.com/v2/projects/export';
  const formParams = new URLSearchParams({
    api_token: apiToken,
    id: String(projectId),
    language,
    type: 'key_value_json',
  });

  const { data: exportResult } = await axios.post(exportUrl, formParams.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!exportResult.result?.url) {
    throw new Error(`Failed to get POEditor export URL: ${JSON.stringify(exportResult, null, 2)}`);
  }

  const downloadUrl = exportResult.result.url;
  const { data: translations } = await axios.get(downloadUrl, {
    responseType: 'json',
  });

  fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), 'utf8');
  console.log(`Pulled translations for ${language} -> ${filePath}`);
}
