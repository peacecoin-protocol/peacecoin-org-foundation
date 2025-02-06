import * as v from 'valibot'
import {
  translateStatusResponse,
  type GetTranslatedStatusOutput,
} from 'schemas/crowdin'

export async function getTranslatedStatus(
  env: Env,
): Promise<GetTranslatedStatusOutput> {
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
    locale: data.language.locale,
    approvalProgress: data.approvalProgress,
    translationProgress: data.translationProgress,
    words: data.words.approved,
    phrases: data.phrases.approved,
  }))
}
