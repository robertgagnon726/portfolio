'use client';

import { apiVersion, dataset, projectId } from '@Root/sanity/env';
import { schema } from '@Root/sanity/schemaTypes';
import { structure } from '@Root/sanity/sanityStructure';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const sanityConfig = defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion }), codeInput()],
});

export default sanityConfig;
