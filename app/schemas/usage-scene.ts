import * as v from 'valibot'

export const usageSceneSchema = v.object({
  id: v.string(),
  subtitle: v.string(),
  title: v.string(),
  coverImageUrl: v.string(),
  description: v.string(),
  lang: v.string(),
  prevPath: v.string(),
  prevLabel: v.string(),
  nextPath: v.string(),
  nextLabel: v.string(),
})

export type UsageScene = v.InferOutput<typeof usageSceneSchema>
