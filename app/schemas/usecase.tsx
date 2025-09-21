import * as v from 'valibot'

export const contentSchema = v.object({
  id: v.string(),
  tokenName: v.string(),
  communityName: v.string(),
  title: v.string(),
  description: v.string(),
  thumbnailUrl: v.string(),
  category: v.string(),
  lang: v.string(),
  publishedAt: v.string(),
})

export type Content = v.InferOutput<typeof contentSchema>
