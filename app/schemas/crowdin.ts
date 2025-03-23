import * as v from 'valibot'

export const intSchema = v.pipe(v.number(), v.integer())

const commonLanguageSchema = v.object({
  id: v.string(), // "ja",
  name: v.string(), // "Japanese",
  editorCode: v.string(), // "ja",
  twoLettersCode: v.string(), // "ja",
  threeLettersCode: v.string(), // "jpn",
  locale: v.string(), // "ja-JP",
  androidCode: v.string(), // "ja-rJP",
  osxCode: v.string(), // "ja.lproj",
  osxLocale: v.string(), // "ja",
  textDirection: v.string(), // "ltr",
  dialectOf: v.nullable(v.string()), // null,
})

export const translateStatusItem = v.object({
  data: v.object({
    languageId: v.string(), // "ja"
    language: v.object({
      ...commonLanguageSchema.entries,
      pluralCategoryNames: v.array(v.string()), // ["other"]
      pluralRules: v.string(), // "0",
      pluralExamples: v.array(v.string()), // ["0-999; 1.2..."]
    }),
    words: v.object({
      total: intSchema,
      translated: intSchema,
      preTranslateAppliedTo: intSchema,
      approved: intSchema,
    }),
    phrases: v.object({
      total: intSchema,
      translated: intSchema,
      preTranslateAppliedTo: intSchema,
      approved: intSchema,
    }),
    translationProgress: intSchema,
    approvalProgress: intSchema,
  }),
})

export const translateStatusResponse = v.object({
  data: v.array(translateStatusItem),
  pagination: v.object({
    offset: intSchema,
    limit: intSchema,
  }),
})

export const getTranslatedStatusOutputSchema = v.array(
  v.object({
    locale: v.string(),
    approvalProgress: intSchema,
    translationProgress: intSchema,
    words: intSchema,
    phrases: intSchema,
  }),
)

export type GetTranslatedStatusOutput = v.InferOutput<
  typeof getTranslatedStatusOutputSchema
>
