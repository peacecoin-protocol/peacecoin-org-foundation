import { v7, v4 } from 'uuid'
import * as v from 'valibot'

const UUID_V7_REGEX =
  '[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}'

const uuidV4Schema = v.pipe(
  v.string(),
  v.regex(
    /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
  ),
)

export const brandIdSchema = <B extends v.BrandName>(
  prefix: string,
  brand: B,
) =>
  v.optional(
    v.pipe(
      v.string(),
      v.regex(new RegExp(`^${prefix}-${UUID_V7_REGEX}$`)),
      v.brand(brand),
    ),
    () => `${prefix}-${v7()}`,
  )

// v4はパーティションの効率的な分散を目的としたランダム性が重要なのでprefixは不適格
export const randomIdSchema = <B extends v.BrandName>(brand: B) =>
  v.optional(v.pipe(uuidV4Schema, v.brand(brand)), () => v4())
