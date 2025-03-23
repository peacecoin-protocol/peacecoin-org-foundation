import * as v from 'valibot'

export const usageSceneSchema = v.object({
  subtitle: v.string(),
  title: v.string(),
  coverImageUrl: v.string(),
  description: v.string(),
  lang: v.string(),
  prevPath: v.string(),
  prevLabel: v.string(),
  nextPath: v.string(),
  nextLabel: v.string(),
  content: v.string(),
})

export type UYsageScene = v.InferOutput<typeof usageSceneSchema>
