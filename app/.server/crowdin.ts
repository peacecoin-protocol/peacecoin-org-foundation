import * as v from 'valibot'
import { v7 as uuidv7 } from 'uuid'
import {
  addFileInputSchema,
  addFileOutputSchema,
  prepareUploadOutput,
  translateStatusResponse,
  updateFileInputSchema,
  updateFileOutputSchema,
  type AddFileInput,
  type AddFileOutput,
  type GetTranslatedStatusOutput,
  type PrepareUploadOutput,
  type UpdateFileInput,
  type UpdateFileOutput,
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

export async function prepareUploadFile(
  env: Env,
  content: Record<string, unknown>,
): Promise<PrepareUploadOutput> {
  const fileName = `${uuidv7()}.json`
  const url = new URL(`/api/v2/storages`, BASE_URL)
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(content),
    headers: {
      Authorization: `Bearer ${env.CROWDIN_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Crowdin-API-FileName': fileName,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to add file to Crowdin: ${await response.text()}`)
  }

  return v.parse(prepareUploadOutput, await response.json())
}

export async function addFile(
  env: Env,
  input: AddFileInput,
): Promise<AddFileOutput> {
  const url = new URL(
    `/api/v2/projects/${env.CROWDIN_PROJECT_ID}/files`,
    BASE_URL,
  )
  const response = await fetch(url, {
    body: JSON.stringify({
      ...v.parse(addFileInputSchema, input),
      type: 'json',
    }),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.CROWDIN_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to add file to Crowdin: ${await response.text()}`)
  }

  return v.parse(addFileOutputSchema, await response.json())
}

export async function updateFile(
  env: Env,
  input: UpdateFileInput,
): Promise<UpdateFileOutput> {
  const { id, ...rest } = v.parse(updateFileInputSchema, input)
  const url = new URL(
    `/api/v2/projects/${env.CROWDIN_PROJECT_ID}/files/${id}`,
    BASE_URL,
  )
  // updateOption: "keep_translations"
  const response = await fetch(url, {
    body: JSON.stringify({
      ...rest,
      updateOption: 'keep_translations',
    }),
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${env.CROWDIN_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to update file in Crowdin: ${await response.text()}`,
    )
  }

  return v.parse(updateFileOutputSchema, await response.json())
}
