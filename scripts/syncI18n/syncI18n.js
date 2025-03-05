import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { generateTsInterfaces } from './generateTsInterfaces.js';
import { syncPoEditorSourceLocale } from './poEditor/syncPoEditor.js';
import dotenv from 'dotenv';
import { pullLocaleFromPoEditor } from './poEditor/pullLocaleFromPoEditor.js';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  program
    .name('sync-i18n')
    .description('Synchronize i18n JSON files from a source locale and generate TS types.')
    .option('-d, --locales-dir <path>', 'Path to the locales directory', 'locales')
    .option('-s, --source-locale <locale>', 'Source locale JSON base name', 'en-us')
    .option('-o, --output-file <path>', 'Path for the generated TS types', 'i18n/types.ts')
    .parse(process.argv);

  const { localesDir, sourceLocale, outputFile } = program.opts();

  const spinner = ora('Syncing i18n files...').start();
  const poEditoryApiKey = process.env.PO_EDITOR_API_KEY;
  const poEditorProjectId = process.env.PO_EDITOR_PROJECT_ID;

  try {
    // Resolve the locales folder path
    const dirPath = path.resolve(__dirname, '..', '..', localesDir);

    spinner.text = 'Pushing source to POEditor...';
    const sourcePath = path.join(dirPath, `${sourceLocale}.json`);
    const fileData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

    await syncPoEditorSourceLocale(poEditoryApiKey, poEditorProjectId, 'en-us', fileData);

    spinner.text = 'Pulling translations from POEditor...';
    const targetLangs = ['es'];
    for (const lang of targetLangs) {
      const localFileName = mapPoEditorLangToLocal(lang);
      const filePath = path.join(dirPath, localFileName);
      await pullLocaleFromPoEditor(poEditoryApiKey, poEditorProjectId, lang, filePath);
    }

    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

    spinner.text = 'Generating TS interfaces...';

    generateTsInterfaces(sourceData, path.resolve(__dirname, '..', '..', outputFile));

    spinner.succeed(chalk.cyan('i18n sync + TS codegen complete!'));
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

// Possibly define a helper to map "fr" -> "fr-FR.json", "en" -> "en-us.json", etc.
function mapPoEditorLangToLocal(lang) {
  if (lang === 'es') return 'es.json';
  if (lang === 'en') return 'en-us.json';
  // fallback
  return `${lang}.json`;
}

// Invoke main
main();
