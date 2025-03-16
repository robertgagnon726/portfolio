import { buildInterfaceName } from './buildInterfaceName.js';

/**
 * Traverse the JSON to build a set of interface definitions for each nested object.
 * Returns a Map of interfaceName -> interfaceDefinition string.
 */
export function traverseTree(obj, keyPath = [], interfaces = new Map()) {
  const currentInterfaceName = buildInterfaceName(keyPath);
  const fields = {};

  for (const [key, val] of Object.entries(obj)) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      traverseTree(val, [...keyPath, key], interfaces);
      fields[key] = buildInterfaceName([...keyPath, key]);
    } else {
      fields[key] = 'string';
    }
  }

  let interfaceDef = `export interface ${currentInterfaceName} {\n`;
  for (const [fieldName, fieldType] of Object.entries(fields)) {
    interfaceDef += `  ${fieldName}: ${fieldType};\n`;
  }
  interfaceDef += '}\n\n';

  interfaces.set(currentInterfaceName, interfaceDef);
  return interfaces;
}
