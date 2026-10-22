let request
;(async () => {
  const mod = await import('@octokit/request')
  request = mod.request
})()
/*
   GitHub Static Data

   This model serves as an intermediary between the templates and
   gatsby-plugin-github-api. If no GITHUB_TOKEN is specified, this node will be
   filled with default dummy data instead of throwing like using the plugin
   alone does.
 */

async function getStars({ owner, repo, token }) {
  const response = await request({
    method: 'GET',
    url: '/repos/{owner}/{repo}',
    owner,
    repo,
    headers: token ? { authorization: `token ${token}` } : {}
  })

  const stars = response.data.stargazers_count

  return stars
}

module.exports = {
  async createSchemaCustomization({ actions: { createTypes }, schema }) {
    createTypes(
      schema.buildObjectType({
        name: 'StaticGithubData',
        fields: {
          stars: 'String'
        }
      })
    )
  },
  async createResolvers({ createResolvers }) {
    createResolvers({
      Query: {
        staticGithubData: {
          type: 'StaticGithubData',
          async resolve() {
            const { GITHUB_TOKEN } = process.env
            if (GITHUB_TOKEN) {
              // An expired token shouldn't fail the build: the repo is public,
              // so retry without it before falling back to dummy data
              for (const token of [GITHUB_TOKEN, undefined]) {
                try {
                  const stars = await getStars({
                    owner: 'iterative',
                    repo: 'cml',
                    token
                  })
                  return { stars }
                } catch (error) {
                  console.warn(
                    `Failed to fetch GitHub stars ${
                      token ? 'with' : 'without'
                    } GITHUB_TOKEN: ${error.message}`
                  )
                }
              }
            }
            return { stars: 8888 }
          }
        }
      }
    })
  }
}
