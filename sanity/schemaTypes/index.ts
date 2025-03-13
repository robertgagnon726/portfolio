import { authorType } from '@Root/sanity/schemaTypes/authorType';
import { blockContentType } from '@Root/sanity/schemaTypes/blockContentType';
import { categoryType } from '@Root/sanity/schemaTypes/categoryType';
import { postType } from '@Root/sanity/schemaTypes/postType';
import { type SchemaTypeDefinition } from 'sanity';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType],
};
