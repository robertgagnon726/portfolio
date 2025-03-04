/**
 * Build an interface name from a path of keys.
 * e.g. ['HomePage'] -> 'HomePageMessages'
 *      ['HomePage','nested'] -> 'HomePageNestedMessages'
 */
export function buildInterfaceName(keyPath) {
  return keyPath.map((k) => k[0].toUpperCase() + k.slice(1)).join('') + 'Messages';
}
