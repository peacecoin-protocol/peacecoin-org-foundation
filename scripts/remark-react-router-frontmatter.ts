import { valueToEstree } from 'estree-util-value-to-estree'
import { type Literal, type Root } from 'mdast'
import { type Plugin } from 'unified'
import { parse as parseYaml } from 'yaml'

type RemarkReactRouerFrontmatterOptions = {
  meta: (frontmatter: unknown) => Record<string, string>[]
  handle: (frontmatter: unknown) => Record<string, string>[]
}

const remarkReactRouerFrontmatter: Plugin<
  [RemarkReactRouerFrontmatterOptions],
  Root
> = (options) => {
  const allParsers: Record<string, (value: string) => unknown> = {
    yaml: parseYaml,
  }

  return (ast) => {
    let data: unknown
    const node = ast.children.find((child) =>
      Object.hasOwn(allParsers, child.type),
    )

    if (node) {
      const parser = allParsers[node.type]
      const { value } = node as Literal
      data = parser(value)
    }

    if (!data) {
      return
    }

    ;(['meta', 'handle'] as const).forEach((key) => {
      const fn = options[key]
      if (fn) {
        ast.children.unshift({
          type: 'mdxjsEsm',
          value: '',
          data: {
            estree: {
              type: 'Program',
              sourceType: 'module',
              body: [
                {
                  type: 'ExportNamedDeclaration',
                  specifiers: [],
                  attributes: [],
                  declaration: {
                    type: 'VariableDeclaration',
                    kind: 'const',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: { type: 'Identifier', name: key },
                        init: {
                          type: 'ArrowFunctionExpression',
                          expression: false,
                          generator: false,
                          async: false,
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ReturnStatement',
                                argument: valueToEstree(fn(data), {
                                  preserveReferences: true,
                                }),
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        })
      }
    })
  }
}

export default remarkReactRouerFrontmatter
