import * as v from 'valibot'

export const usecaseSchema = v.object({
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

export type Usecase = v.InferOutput<typeof usecaseSchema>
