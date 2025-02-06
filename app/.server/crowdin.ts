import * as v from 'valibot'

const intSchema = v.pipe(v.number(), v.integer())

const translateStatusItem = v.object({
  data: v.object({
    languageId: v.string(), // "ja"
    language: v.object({
      id: v.string(), // "ja",
      name: v.string(), // "Japanese",
      editorCode: v.string(), // "ja",
      twoLettersCode: v.string(), // "ja",
      threeLettersCode: v.string(), // "jpn",
      locale: v.string(), // "ja-JP",
      androidCode: v.string(), // "ja-rJP",
      osxCode: v.string(), // "ja.lproj",
      osxLocale: v.string(), // "ja",
      pluralCategoryNames: v.array(v.string()), // ["other"]
      pluralRules: v.string(), // "0",
      pluralExamples: v.array(v.string()), // ["0-999; 1.2..."]
      textDirection: v.string(), // "ltr",
      dialectOf: v.nullable(v.string()), // null,
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

const translateStatusResponse = v.object({
  data: v.array(translateStatusItem),
  pagination: v.object({
    offset: intSchema,
    limit: intSchema,
  }),
})

export async function getTranslatedStatus(env: Env) {
  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${env.CROWDIN_PROJECT_ID}/languages/progress`,
  )
  url.search = new URLSearchParams({
    limit: '100',
    offset: '0',
  }).toString()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.CROWDIN_ACCESS_TOKEN}`,
    },
  })
  const result = v.parse(translateStatusResponse, await response.json())

  return result.data.map(({ data }) => ({
    id: data.languageId,
    progress: data.approvalProgress,
    words: data.words.total,
  }))
}
