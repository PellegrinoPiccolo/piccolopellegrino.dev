import {at, defineMigration, set} from 'sanity/migrate'
import {projects, stackGroups, type ProjectTranslation} from './translations'

type Kind = 'String' | 'Text' | 'StringList'
type Row = {_key: string; _type: string; language: string; value: unknown}
type Obj = Record<string, unknown> & {_key?: string}

const isLocalized = (value: unknown): value is Row[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((item) => item && typeof item === 'object' && 'language' in item)

const localize = (kind: Kind, en: unknown, it: unknown) => {
  if (isLocalized(en)) return en
  const empty = (value: unknown) =>
    value == null || value === '' || (Array.isArray(value) && value.length === 0)
  const rows: Row[] = []
  if (!empty(it))
    rows.push({_key: 'it', _type: `internationalizedArray${kind}Value`, language: 'it', value: it})
  if (!empty(en))
    rows.push({_key: 'en', _type: `internationalizedArray${kind}Value`, language: 'en', value: en})
  return rows.length ? rows : undefined
}

const localizeFields = (
  item: Obj,
  fields: Record<string, Kind>,
  translation: Record<string, unknown> = {},
): Obj => {
  const next: Obj = {...item}
  for (const [field, kind] of Object.entries(fields)) {
    const value = localize(kind, item[field], translation[field])
    if (value === undefined) delete next[field]
    else next[field] = value
  }
  return next
}

const localizeArray = (
  items: unknown,
  fields: Record<string, Kind>,
  translations: Record<string, Record<string, unknown>> = {},
) =>
  Array.isArray(items)
    ? (items as Obj[]).map((item) => localizeFields(item, fields, translations[item._key ?? '']))
    : undefined

const changed = (before: unknown, after: unknown) =>
  after !== undefined && JSON.stringify(before) !== JSON.stringify(after)

const projectPatches = (doc: Obj, t: ProjectTranslation) => {
  const links = doc.links as Obj | undefined
  const cover = doc.cover as Obj | undefined
  const next: Obj = {
    ...localizeFields(
      doc,
      {
        excerpt: 'Text',
        role: 'String',
        platforms: 'String',
        architectureSummary: 'String',
        layersBoundary: 'String',
        seoTitle: 'String',
        seoDescription: 'Text',
      },
      t,
    ),
    links:
      links?.storeLabel !== undefined
        ? localizeFields(links, {storeLabel: 'String'}, {storeLabel: t.storeLabel})
        : undefined,
    cover:
      cover?.alt !== undefined
        ? localizeFields(cover, {alt: 'String'}, {alt: t.coverAlt})
        : undefined,
    gallery: localizeArray(doc.gallery, {alt: 'String', caption: 'String'}, t.gallery),
    layers: localizeArray(
      doc.layers,
      {name: 'String', tech: 'String', connector: 'String'},
      t.layers,
    ),
    decisions: localizeArray(
      doc.decisions,
      {
        title: 'String',
        shortLabel: 'String',
        context: 'Text',
        decision: 'Text',
        tradeoff: 'Text',
        alternatives: 'StringList',
      },
      t.decisions,
    ),
  }
  return Object.keys(next)
    .filter((key) => changed(doc[key], next[key]))
    .map((key) => at(key, set(next[key])))
}

export default defineMigration({
  title: 'Localize text fields in Italian and English',
  documentTypes: ['project', 'stack'],
  migrate: {
    document(doc) {
      const id = doc._id.replace(/^drafts\./, '')
      if (doc._type === 'stack') {
        const groups = localizeArray(doc.groups, {title: 'String', note: 'String'}, stackGroups)
        return changed(doc.groups, groups) ? [at('groups', set(groups))] : []
      }
      return projectPatches(doc as Obj, projects[id] ?? {})
    },
  },
})
