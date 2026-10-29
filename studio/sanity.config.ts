import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {StudioIcon} from './components/StudioIcon'

export default defineConfig({
  name: 'default',
  title: 'piccolopellegrino.dev',
  icon: StudioIcon,

  projectId: 'a3mtaf9y',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
