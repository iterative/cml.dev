const path = require("path")
const fs = require("fs")

exports.createSchemaCustomization = async api => {
  const {
    schema: { buildObjectType },
    actions: { createTypes },
  } = api

  createTypes([
    buildObjectType({
      name: "Page",
      interfaces: ["Node"],
      fields: {
        slug: "String!",
        pagePath: "String!",
        template: "String",
        file: {
          type: "File!",
          extensions: {
            link: { by: "id" },
          },
        },
      },
    }),
  ])
}

exports.onCreateNode = async api => {
  const {
    node,
    getNode,
    createNodeId,
    createContentDigest,
    actions: { createNode, createParentChildLink },
  } = api

  const indexName = "index"

  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent)
    const { relativeDirectory, name: filename } = fileNode
    switch (fileNode.relativeDirectory) {
      default: {
        const {
          frontmatter: { template },
        } = node
        const slug = filename === indexName ? "" : filename
        const fields = {
          slug,
          template,
          pagePath: path.posix.join("/", relativeDirectory, slug),
        }

        const pageNode = {
          ...fields,
          id: createNodeId(`${node.id} >>> Page`),
          parent: node.id,
          file: fileNode.id,
          children: [],
          internal: {
            type: "Page",
            contentDigest: createContentDigest(fields),
          },
        }

        await createNode(pageNode)
        await createParentChildLink({ parent: node, child: pageNode })
        return
      }
    }
  }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data, errors } = await graphql(`
    query TemplatedPageQuery {
      allPage {
        nodes {
          pagePath
          template
          parent {
            id
          }
        }
      }
    }
  `)

  if (errors) throw new Error(errors)

  const {
    allPage: { nodes },
  } = data

  return Promise.all(
    nodes.map(({ pagePath, template = "default", parent: { id } }) =>
      createPage({
        path: pagePath,
        component: require.resolve(
          path.resolve("src/templates", template || "default")
        ),
        context: {
          id,
        },
      })
    )
  )
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
