const url = require('url')
const {
  buildSidebarRedirects,
  processRedirectString,
  getRedirect
} = require('./redirects')

describe('buildRedirectsList', () => {
  it('builds correct redirects list', () => {
    const list = [
      {
        source: false,
        path: '/a',
        children: [
          {
            path: '/a/b',
            source: 'some-file'
          }
        ]
      }
    ]

    expect(buildSidebarRedirects(list)).toEqual(['^/a/?$ /a/b 307'])
  })
})

describe('processRedirectString', () => {
  it('reads the regex, replacement and code', () => {
    const { regex, replace, code } = processRedirectString('^/foo /bar 418')

    expect(regex).toBeInstanceOf(RegExp)
    expect(regex.source).toEqual('^\\/foo')
    expect(replace).toEqual('/bar')
    expect(code).toEqual(418)
  })

  it('defaults to 301 response code', () => {
    const { code } = processRedirectString('^/x /y')

    expect(code).toEqual(301)
  })

  it('detects whether redirecting a full URL or just a path', () => {
    const { matchPathname: matchPathnameFalse } = processRedirectString(
      '^https://example.com/foo /x'
    )
    expect(matchPathnameFalse).toEqual(false)

    const { matchPathname } = processRedirectString('^/path /y')
    expect(matchPathname).toEqual(true)
  })
})

describe('getRedirects', () => {
  it('enforces HTTPS and removes www simultaneously', () => {
    const mockReq = {
      headers: {
        'x-forwarded-proto': 'http'
      },
      url: '/foo/bar?baz'
    }
    expect(
      getRedirect('www.dvc.org', '/not-used', { req: mockReq, dev: false })
    ).toEqual([301, 'https://dvc.org/foo/bar?baz'])
  })

  const itRedirects = (source, target, code = 301) => {
    const addHost = pathOrUrl => {
      if (pathOrUrl.startsWith('/')) {
        return `https://dvc.org${pathOrUrl}`
      }
      return pathOrUrl
    }

    it(`${source} -> ${target} (${code})`, () => {
      source = addHost(source)
      const { hostname, pathname } = url.parse(source)
      const [rCode, rLocation] = getRedirect(hostname, pathname)

      expect(rLocation).toEqual(target)
      expect(rCode).toEqual(code)

      // Detect redirect loops.
      const secondUrl = url.parse(addHost(rLocation))
      const secondRedirect = getRedirect(secondUrl.hostname, secondUrl.pathname)

      // allow second redirect only if it removes trailing slash
      if (secondRedirect.length) {
        const thirdUrl = url.parse(addHost(secondRedirect[1]))
        expect(secondUrl.host).toEqual(thirdUrl.host)
        expect(secondUrl.pathname.replace(/\/$/, '')).toEqual(secondRedirect[1])

        const thirdRedirect = getRedirect(thirdUrl.hostname, thirdUrl.pathname)
        expect(thirdRedirect).toEqual([])
      }
    })
  }

  describe('fromPaths', () => {
    itRedirects('/docs/x', '/doc/x')
    itRedirects('/documentation/x', '/doc/x')
  })
})
