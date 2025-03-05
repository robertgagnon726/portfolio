/**
 * Recursively traverse a nested JSON object to collect:
 * 1) An array of terms: [ { term: "HomePage.title" }, ... ]
 * 2) An array of translations: [ { term: "HomePage.title", translation: { content: "Hello" } }, ... ]
 *
 * @param {object} obj - The nested i18n object (e.g. en-us.json content)
 * @param {string} prefix - Internal prefix for nested keys
 * @param {Array} localTerms - List of terms without translations
 * @param {Array} localTranslations - List of translations
 * @returns {{ termsArr: Array, translationsArr: Array }}
 */
export function collectTermsAndTranslations(obj, prefix = '', localTerms = [], localTranslations = []) {
  for (const [key, val] of Object.entries(obj)) {
    // Build the flattened path "HomePage.title"
    const path = prefix ? `${prefix}.${key}` : key;

    // If it's a nested object (not array), recurse
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      collectTermsAndTranslations(val, path, localTerms, localTranslations);
    } else {
      // It's a leaf (string, number, boolean, etc.)
      localTerms.push({ term: path });
      localTranslations.push({
        term: path,
        translation: {
          content: String(val),
        },
      });
    }
  }

  return { localTerms, localTranslations };
}
