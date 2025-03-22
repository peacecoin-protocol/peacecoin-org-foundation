import * as v from 'valibot'

export const communityTokenSchema = v.object({
  tokenAddress: v.string(),
  name: v.string(),
  // symbol: v.string(),
})

export type CommunityToken = v.InferOutput<typeof communityTokenSchema>
