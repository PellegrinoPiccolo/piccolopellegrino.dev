export const languages = [
  {id: 'it', title: 'Italiano'},
  {id: 'en', title: 'English'},
]

type LocalizedValue = {language?: string; value?: unknown}

export const localized = (field: unknown): string | undefined => {
  if (!Array.isArray(field)) return typeof field === 'string' ? field : undefined
  const values = field as LocalizedValue[]
  const match = languages
    .map(({id}) => values.find((item) => item.language === id)?.value)
    .find((value) => typeof value === 'string' && value)
  return match as string | undefined
}
