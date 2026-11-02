import {featuredProjects} from './featuredProjects'
import {project} from './project'
import {resume} from './resume'
import {stack} from './stack'

export const schemaTypes = [project, featuredProjects, stack, resume]

export const singletonTypes = new Set(['featuredProjects', 'stack', 'resume'])
