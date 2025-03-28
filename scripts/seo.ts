export type GenerateMetaProps = {
  title: string
  description: string
  type?: 'website' | 'article'
}

export function generateMeta({
  title,
  description,
  type = 'website',
}: GenerateMetaProps) {
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: description },
  ]
}
