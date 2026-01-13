import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const SETTINGS_ID = '31aae333-3eec-421b-98a7-81d2fe45e17d';

export default defineConfig({
  name: 'default',
  title: 'my-portfolio',

  projectId: 'dcoqgmz1',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (input, context) =>
      context.schemaType === 'settings'
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
