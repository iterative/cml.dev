import React from 'react'
import Link from '@dvcorg/gatsby-theme-iterative/src/components/Link'

import * as styles from './styles.module.css'

const Alert: React.FC = () => (
  <div className={styles.alert}>
    <div className={styles.text}>
      <p>
        <span role="img" aria-label="warning">
          ⚠️
        </span>{' '}
        asset.cml.dev no longer accepts image uploads.{' '}
        <Link href="/doc/image-hosting">Set up your own image hosting</Link>
      </p>
    </div>
  </div>
)

export default Alert
