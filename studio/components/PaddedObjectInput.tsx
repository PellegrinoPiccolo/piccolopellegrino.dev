import {Box} from '@sanity/ui'
import type {ObjectInputProps} from 'sanity'

export function PaddedObjectInput(props: ObjectInputProps) {
  return <Box paddingBottom={5}>{props.renderDefault(props)}</Box>
}
