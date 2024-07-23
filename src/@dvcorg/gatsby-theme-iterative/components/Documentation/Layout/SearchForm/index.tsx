import React, { useEffect, useState } from 'react'
import Promise from 'promise-polyfill'
import { loadResource } from '@dvcorg/gatsby-theme-iterative/src/utils/front/resources'

import * as styles from '@dvcorg/gatsby-theme-iterative/src/components/Documentation/Layout/SearchForm/styles.module.css'

const apiKey = '3e17d424c7a90fede27b848fb01c0dc2'
const appId = '1O03WAGL0D'
const indexName = 'cml'

const SearchForm: React.FC = props => {
  const [searchAvailable, setSearchAvailable] = useState<boolean>(false)
  useEffect(() => {
    console.log({ window, docSearch: window?.docsearch })
    if (window) {
      if (!window.docsearch) {
        Promise.all([
          loadResource(
            'https://cdn.jsdelivr.net/npm/docsearch.js@2.6.2/dist/cdn/docsearch.min.css'
          ),
          loadResource(
            'https://cdn.jsdelivr.net/npm/docsearch.js@2.6.2/dist/cdn/docsearch.min.js'
          )
        ]).then(() => {
          if (window.docsearch) {
            window.docsearch({
              appId,
              apiKey,
              indexName,
              inputSelector: '#doc-search',
              debug: false // Set to `true` if you want to inspect the dropdown
            })
            setSearchAvailable(true)
          }
        })
      } else {
        window.docsearch({
          appId,
          apiKey,
          indexName,
          inputSelector: '#doc-search',
          debug: false // Set to `true` if you want to inspect the dropdown
        })
        setSearchAvailable(true)
      }
    }
  }, [])

  return (
    <div className={styles.searchArea}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          id="doc-search"
          placeholder="Search docs"
          disabled={!searchAvailable}
          {...props}
        />
      </div>
    </div>
  )
}

export default SearchForm
