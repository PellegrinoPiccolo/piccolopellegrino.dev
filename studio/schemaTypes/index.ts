import {featuredProjects} from './featuredProjects'
import {project} from './project'

export const schemaTypes = [project, featuredProjects]

export const singletonTypes = new Set(['featuredProjects'])
