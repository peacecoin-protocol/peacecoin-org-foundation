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

const idSchema = v.union([
  intSchema,
  v.pipe(
    v.string(),
    v.transform((v) => parseInt(v, 10)),
  ),
])

export const crowdinFileIdSchema = v.pipe(idSchema, v.brand('CrowdinFileId'))

export const crowdinProjectdSchema = v.pipe(
  idSchema,
  v.brand('CrowdinProjectId'),
)

export const crowdinDirectoryIdSchema = v.pipe(
  idSchema,
  v.brand('CrowdinDirectoryId'),
)

export const crowdinBranchIdSchema = v.pipe(
  idSchema,
  v.brand('CrowdinBranchId'),
)

export const prepareUploadOutput = v.object({
  data: v.object({
    id: crowdinFileIdSchema,
    fileName: v.string(),
  }),
})

export const addFileInputSchema = v.object({
  storageId: idSchema,
  name: v.string(),
  directoryId: crowdinDirectoryIdSchema,
  title: v.string(),
})

export const addFileOutputSchema = v.object({
  data: v.object({
    id: crowdinFileIdSchema,
    projectId: crowdinProjectdSchema,
    branchId: v.nullable(crowdinBranchIdSchema),
    directoryId: v.nullable(crowdinDirectoryIdSchema),
    name: v.string(),
    title: v.nullable(v.string()),
    context: v.nullable(v.string()),
    type: v.string(),
    path: v.string(),
    status: v.string(),
    revisionId: idSchema,
    priority: v.string(),
    excludedTargetLanguages: v.nullable(v.array(v.string())),
    parserVersion: v.nullable(idSchema),
    createdAt: v.nullable(v.string()),
    updatedAt: v.nullable(v.string()),
    // importOptions: v.object({}),
    // exportOptions: v.object({}),
  }),
})

export const updateFileInputSchema = v.object({
  id: crowdinFileIdSchema,
  storageId: idSchema,
  name: v.string(),
})

export const updateFileOutputSchema = addFileOutputSchema

export const fileApprovedWebhookSchema = v.object({
  event: v.literal('file.approved'),
  file: v.object({
    id: crowdinFileIdSchema,
    branchId: v.nullable(crowdinBranchIdSchema),
    directoryId: v.nullable(crowdinDirectoryIdSchema),
    name: v.string(),
    title: v.nullable(v.string()),
    type: v.string(),
    path: v.string(),
    status: v.string(),
    revisionId: idSchema,
    // project: v.object({
    //   id: crowdinProjectdSchema,
    //   userId: idSchema,
    //   sourceLanguageId: v.string(),
    //   targetLanguageIds: v.array(v.string()),
    //   identifier: v.string(),
    //   name: v.string(),
    //   createdAt: v.string(),
    //   updatedAt: v.string(),
    //   lastActivity: v.string(),
    //   description: v.string(),
    //   url: v.string(),
    //   cname: v.nullable(v.string()),
    //   languageAccessPolicy: v.string(),
    //   visibility: v.string(),
    //   publicDownloads: v.boolean(),
    // }),
  }),
  targetLanguage: commonLanguageSchema,
})

export type CrowdinFileId = v.InferOutput<typeof crowdinFileIdSchema>

export type CrowdinProjectd = v.InferOutput<typeof crowdinProjectdSchema>

export type CrowdinDirectoryId = v.InferOutput<typeof crowdinDirectoryIdSchema>

export type CrowdinBranchId = v.InferOutput<typeof crowdinBranchIdSchema>

export type GetTranslatedStatusOutput = v.InferOutput<
  typeof getTranslatedStatusOutputSchema
>

export type PrepareUploadOutput = v.InferOutput<typeof prepareUploadOutput>

export type AddFileInput = v.InferInput<typeof addFileInputSchema>

export type AddFileOutput = v.InferOutput<typeof addFileOutputSchema>

export type UpdateFileInput = v.InferInput<typeof updateFileInputSchema>

export type UpdateFileOutput = v.InferOutput<typeof updateFileOutputSchema>
