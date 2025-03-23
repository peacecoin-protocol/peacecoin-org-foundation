import * as v from 'valibot'

export const usecaseMasterSchema = v.object({
  id: v.string(),
  tokenName: v.string(),
  communityName: v.string(),
  title: v.string(),
  description: v.string(),
  thumbnailUrl: v.string(),
  category: v.string(),
  lang: v.string(),
  publishedAt: v.string(),
  content: v.string(),
})

export const usecaseMetaSchema = v.omit(usecaseMasterSchema, ['content'])

export type UsecaseMaster = v.InferOutput<typeof usecaseMasterSchema>

export type UsecaseMeta = v.InferOutput<typeof usecaseMetaSchema>
