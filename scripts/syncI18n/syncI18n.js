import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { syncKeys } from './syncKeys.js';
import { generateTsInterfaces } from './generateTsInterfaces.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  program
    .name('sync-i18n')
    .description('Synchronize i18n JSON files from a source locale and generate TS types.')
    .option('-r, --remove-obsolete', 'Remove keys not in the source locale')
    .option('-d, --locales-dir <path>', 'Path to the locales directory', 'locales')
    .option('-s, --source-locale <locale>', 'Source locale JSON base name', 'en-US')
    .option('-o, --output-file <path>', 'Path for the generated TS types', 'i18n/types.ts')
    .parse(process.argv);

  const { removeObsolete, localesDir, sourceLocale, outputFile } = program.opts();

  const spinner = ora('Syncing i18n files...').start();

  try {
    // Resolve the locales folder path
    const dirPath = path.resolve(__dirname, '..', '..', localesDir);

    // Read the source JSON (e.g. en-US.json)
    const sourcePath = path.join(dirPath, `${sourceLocale}.json`);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file "${sourcePath}" does not exist`);
    }

    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

    // Gather all other JSON files in the directory
    const localeFiles = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.json') && file !== `${sourceLocale}.json`);

    for (const fileName of localeFiles) {
      const filePath = path.join(dirPath, fileName);
      const targetData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const syncedData = syncKeys(sourceData, targetData, removeObsolete);
      fs.writeFileSync(filePath, JSON.stringify(syncedData, null, 2));

      console.log(chalk.green(`✓ Synced ${fileName}`));
    }

    spinner.text = 'Generating TS interfaces...';

    generateTsInterfaces(sourceData, path.resolve(__dirname, '..', '..', outputFile));

    spinner.succeed(chalk.cyan('i18n sync + TS codegen complete!'));
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

// Invoke main
main();
