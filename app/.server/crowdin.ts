import * as v from 'valibot'
import {
  translateStatusResponse,
  type GetTranslatedStatusOutput,
} from '@/schemas'

const BASE_URL = 'https://api.crowdin.com'

export async function getTranslatedStatus(
  env: Env,
): Promise<GetTranslatedStatusOutput> {
  const url = new URL(
    `/api/v2/projects/${env.CROWDIN_PROJECT_ID}/languages/progress`,
    BASE_URL,
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

  if (!response.ok) {
    throw new Error(
      `Failed to get translated status from Crowdin: ${await response.text()}`,
    )
  }

  const result = v.parse(translateStatusResponse, await response.json())

  return result.data.map(({ data }) => ({
    locale: data.language.locale,
    approvalProgress: data.approvalProgress,
    translationProgress: data.translationProgress,
    words: data.words.approved,
    phrases: data.phrases.approved,
  }))
}
