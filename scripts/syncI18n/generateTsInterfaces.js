import { traverseTree } from './traverseTree.js';
import fs from 'fs';
import chalk from 'chalk';
import { buildInterfaceName } from './buildInterfaceName.js';

/**
 * Build the top-level TranslationMessages interface to tie root keys -> sub-interfaces.
 */
function buildTranslationMessagesInterface(rootObj) {
  const lines = Object.keys(rootObj).map((key) => {
    const typeName = buildInterfaceName([key]);
    return `  ${key}: ${typeName};`;
  });

  return 'export interface TranslationMessages {\n' + lines.join('\n') + '\n}\n';
}

/**
 * Generate all TS interfaces from en-us.json (or whichever is the source),
 * then write them out to 'types.ts' (by default).
 */
export function generateTsInterfaces(jsonData, outputFile) {
  const interfacesMap = new Map();

  // Traverse each top-level key in the source JSON
  for (const [topKey, val] of Object.entries(jsonData)) {
    traverseTree(val, [topKey], interfacesMap);
  }

  // Combine all sub-interfaces into one big string
  // Sort them to get a stable output
  const sortedNames = [...interfacesMap.keys()].sort();
  let code = '// AUTO-GENERATED FILE – DO NOT EDIT DIRECTLY\n\n';
  for (const name of sortedNames) {
    code += interfacesMap.get(name);
  }

  // Finally, add the "TranslationMessages" interface
  code += buildTranslationMessagesInterface(jsonData);

  fs.writeFileSync(outputFile, code, 'utf8');
  console.log(chalk.blueBright(`✅ Wrote generated types to: ${outputFile}`));
}
