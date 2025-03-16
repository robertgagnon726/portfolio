import { PortableTextBlock, toPlainText } from 'next-sanity';

/**
 * Calculates the estimated reading time for the given rich text content.
 *
 * This function converts an array of PortableTextBlock objects (rich text)
 * into plain text, counts the number of words, and estimates the reading time based
 * on a reading speed of 200 words per minute. The result is the ceiling of the minutes
 * needed to read the text.
 *
 * @param richText - An array of PortableTextBlock objects representing the rich text content.
 * @returns The estimated reading time in minutes as a number.
 */
export const getReadLength = (richText: PortableTextBlock[]): number => {
  const plainText = toPlainText(richText);

  const wordsPerMinute = 200;

  const words = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};
