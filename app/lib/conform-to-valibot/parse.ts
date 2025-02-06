import {
  type Intent,
  type Submission,
  formatPaths,
  parse,
} from '@conform-to/dom'
import * as v from 'valibot'

type BaseIssue = v.BaseIssue<unknown>
type BaseSchema = v.BaseSchema<unknown, unknown, BaseIssue>

function getError<Schema extends BaseSchema, FormError>(
  issues: [v.InferIssue<Schema>, ...v.InferIssue<Schema>[]],
  formatError: (issues: Array<BaseIssue>) => FormError,
): Record<string, FormError | null> | null {
  const result: Record<string, BaseIssue[] | null> = {}

  for (const issue of issues) {
    const name = formatPaths(
      issue.path?.map((path) => path.key as string) ?? [],
    )

    switch (issue.message) {
      case conformValibotMessage.VALIDATION_UNDEFINED:
        return null
      case conformValibotMessage.VALIDATION_SKIPPED:
        result[name] = null
        break
      default: {
        const issues = result[name]

        if (issues !== null) {
          if (issues) {
            result[name] = issues.concat(issue)
          } else {
            result[name] = [issue]
          }
        }
        break
      }
    }
  }

  return Object.entries(result).reduce<Record<string, FormError | null>>(
    (result, [name, issues]) => {
      result[name] = issues ? formatError(issues) : null

      return result
    },
    {},
  )
}

export function parseWithValibot<Schema extends BaseSchema>(
  payload: FormData | URLSearchParams,
  options: {
    schema: Schema | ((intent: Intent | null) => Schema)
    async?: false
    config?: v.Config<v.InferIssue<Schema>>
  },
): Submission<v.InferInput<Schema>, string[], v.InferOutput<Schema>>
export function parseWithValibot<Schema extends BaseSchema, FormError>(
  payload: FormData | URLSearchParams,
  options: {
    schema: Schema | ((intent: Intent | null) => Schema)
    async?: false
    config?: v.Config<v.InferIssue<Schema>>
    formatError: (issues: Array<BaseIssue>) => FormError
  },
): Submission<v.InferInput<Schema>, FormError, v.InferOutput<Schema>>
export function parseWithValibot<Schema extends BaseSchema>(
  payload: FormData | URLSearchParams,
  options: {
    schema: Schema | ((intent: Intent | null) => Schema)
    async: true
    config?: v.Config<v.InferIssue<Schema>>
  },
): Promise<Submission<v.InferInput<Schema>, string[], v.InferOutput<Schema>>>
export function parseWithValibot<Schema extends BaseSchema, FormError>(
  payload: FormData | URLSearchParams,
  options: {
    schema: Schema | ((intent: Intent | null) => Schema)
    async: true
    config?: v.Config<v.InferIssue<Schema>>
    formatError: (issues: Array<BaseIssue>) => FormError
  },
): Promise<Submission<v.InferInput<Schema>, FormError, v.InferOutput<Schema>>>
export function parseWithValibot<Schema extends BaseSchema, FormError>(
  payload: FormData | URLSearchParams,
  options: {
    schema: Schema | ((intent: Intent | null) => Schema)
    async?: boolean
    config?: v.Config<v.InferIssue<Schema>>
    formatError?: (issues: Array<BaseIssue>) => FormError
  },
):
  | Submission<
      v.InferInput<Schema>,
      FormError | string[],
      v.InferOutput<Schema>
    >
  | Promise<
      Submission<
        v.InferInput<Schema>,
        FormError | string[],
        v.InferOutput<Schema>
      >
    > {
  return parse(payload, {
    resolve(payload, intent) {
      // const schema = enableTypeCoercion(
      // 	typeof options.schema === 'function'
      // 		? options.schema(intent)
      // 		: options.schema,
      // );
      const schema =
        typeof options.schema === 'function'
          ? options.schema(intent)
          : options.schema

      const resolveSubmission = (result: v.SafeParseResult<Schema>) => {
        return {
          value: result.success ? result.output : undefined,
          error: !result.success
            ? getError<Schema, FormError | string[]>(
                result.issues,
                options.formatError ??
                  ((issues) => issues.map((issue) => issue.message)),
              )
            : undefined,
        }
      }

      return options.async
        ? v
            .safeParseAsync(schema, payload, options.config)
            .then(resolveSubmission)
        : resolveSubmission(v.safeParse(schema, payload, options.config))
    },
  })
}

export const conformValibotMessage = {
  VALIDATION_SKIPPED: '__skipped__',
  VALIDATION_UNDEFINED: '__undefined__',
}
