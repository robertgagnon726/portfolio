/**
 * Recursively sync keys from sourceObj into targetObj.
 * If removeObsolete is true, any keys not in sourceObj are removed from targetObj.
 */
export function syncKeys(sourceObj, targetObj, removeObsolete = false) {
  const output = {};

  // For every key in the source, ensure it exists in target
  for (const key of Object.keys(sourceObj)) {
    const sourceVal = sourceObj[key];
    const targetVal = targetObj[key];

    if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
      // Recurse on nested objects
      output[key] = syncKeys(sourceVal, targetVal || {}, removeObsolete);
    } else {
      // If missing in target, use placeholder
      output[key] = targetVal !== undefined ? targetVal : 'TODO: Fill translation';
    }
  }

  // Optionally drop keys not in source
  if (!removeObsolete) {
    for (const key of Object.keys(targetObj)) {
      if (!(key in sourceObj)) {
        output[key] = targetObj[key];
      }
    }
  }

  return output;
}
