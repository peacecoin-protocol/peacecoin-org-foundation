/* eslint-disable @typescript-eslint/no-explicit-any */
import { writeFile } from 'fs/promises'

const CROWDIN_PROJECT_ID = '629106'
const CROWDIN_ACCESS_TOKEN = process.env.CROWDIN_ACCESS_TOKEN
const DEFAULT_LOCALE = 'en'
const LIMIT = 100

export async function getTranslatedProgress() {
  if (!CROWDIN_ACCESS_TOKEN) {
    return
  }

  const url = new URL(
    `https://api.crowdin.com/api/v2/projects/${CROWDIN_PROJECT_ID}/languages/progress`,
  )
  url.search = new URLSearchParams({
    limit: `${LIMIT}`,
    offset: '0',
  }).toString()
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.CROWDIN_ACCESS_TOKEN || CROWDIN_ACCESS_TOKEN}`,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to get translated status from Crowdin: ${await response.text()}`,
    )
  }

  const result = (await response.json()) as any
  const locales = result.data.map(({ data }: any) => ({
    locale: data.language.locale, // data.languageId
    progress: Math.floor((data.words.approved / data.words.total) * 100),
    total: data.words.total,
  }))

  await writeFile(
    'app/constants/crowdin.ts',
    `export const translatedProgress = ${JSON.stringify([
      {
        locale: DEFAULT_LOCALE,
        progress: 100,
        total: locales[0].total,
      },
      ...locales,
    ])}`,
  )
}
