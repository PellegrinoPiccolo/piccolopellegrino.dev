import {featuredProjects} from './featuredProjects'
import {project} from './project'
import {stack} from './stack'

export const schemaTypes = [project, featuredProjects, stack]

export const singletonTypes = new Set(['featuredProjects', 'stack'])
