import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
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
  },
})
