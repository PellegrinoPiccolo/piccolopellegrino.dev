import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {structure} from './structure'
import {StudioIcon} from './components/StudioIcon'
import {deployTool} from './tools/deployTool'

export default defineConfig({
  name: 'default',
  title: 'piccolopellegrino.dev',
  icon: StudioIcon,

  projectId: 'a3mtaf9y',
  dataset: 'production',

  plugins: [structureTool({structure})],
  tools: [deployTool],

  releases: {
    enabled: false,
  },
  scheduledDrafts: {
    enabled: false,
  },

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(
            ({action}) =>
              action === 'publish' || action === 'discardChanges' || action === 'restore',
          )
        : actions,
  },
})
