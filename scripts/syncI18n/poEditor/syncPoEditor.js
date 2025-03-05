import { getTerms } from './getTerms.js';
import { addTerms } from './addTerms.js';
import { removeTerms } from './removeTerms.js';
import { addTranslations } from './addTranslations.js';
import { collectTermsAndTranslations } from './collectTermsAndTranslations.js';
import { updateTerms } from './updateTerms.js';
import { updateTranslations } from './updateTranslations.js';
import { automaticTranslate } from './automaticTranslate.js';

/**
 * Syncs the local "source" JSON with the POEditor project for the given language (usually 'en-us').
 * Steps:
 * 1) Flatten local JSON -> arrays of terms + translations
 * 2) Get existing terms from POEditor
 * 3) Add new terms
 * 4) Remove obsolete terms
 * 5) Add or update translations for each term
 */
export async function syncPoEditorSourceLocale(apiToken, projectId, language, localJSON) {
  const { localTerms, localTranslations } = collectTermsAndTranslations(localJSON);

  // 2) Get existing terms from POEditor
  const remoteTermsList = await getTerms(apiToken, projectId);
  // remoteTermsList might be an array: [ { term: 'HomePage.title', context: ... }, ... ]

  // Convert arrays to sets for easy comparison
  const remoteTermSet = new Set(remoteTermsList.map((t) => t.term));
  const localTermSet = new Set(localTerms.map((t) => t.term));

  // 3) Figure out which terms are new vs. existing
  const termsToAdd = localTerms.filter((t) => !remoteTermSet.has(t.term));
  const termsToUpdate = localTerms.filter((t) => remoteTermSet.has(t.term));

  // Add new terms
  if (termsToAdd.length > 0) {
    await addTerms(apiToken, projectId, termsToAdd);
    console.log(`Added ${termsToAdd.length} new terms to POEditor.`);
  }

  // Update existing terms
  if (termsToUpdate.length > 0) {
    await updateTerms(apiToken, projectId, termsToUpdate, false /* sync = false */);
    console.log(`Updated ${termsToUpdate.length} existing terms in POEditor.`);
  }

  // 4) Remove obsolete terms (in remote but not local)
  const termsToRemove = remoteTermsList.filter((t) => !localTermSet.has(t.term)).map((t) => t.term);

  if (termsToRemove.length > 0) {
    await removeTerms(apiToken, projectId, termsToRemove);
    console.log(`Removed ${termsToRemove.length} obsolete terms from POEditor.`);
  }

  // and existing term strings
  const existingTermStrings = new Set(termsToUpdate.map((t) => t.term));

  const translationsToUpdate = localTranslations.filter((tr) => existingTermStrings.has(tr.term));

  // Add translations for new terms
  if (localTranslations.length > 0) {
    await addTranslations(apiToken, projectId, language, localTranslations);
    console.log(`Added translations for ${localTranslations.length} newly added terms.`);
  }

  // Update translations for existing terms
  if (translationsToUpdate.length > 0) {
    await updateTranslations(apiToken, projectId, language, translationsToUpdate);
    console.log(`Updated translations for ${translationsToUpdate.length} existing terms.`);
  }

  const targetLanguages = [
    {
      project_language: 'es',
      provider_language: 'es',
    },
  ];

  await automaticTranslate(apiToken, projectId, language, targetLanguages);
}
