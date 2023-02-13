import React from 'react'
import { AlertContent } from '@dvcorg/gatsby-theme-iterative/src/components/LayoutHeader/Alert/content'

import * as styles from './styles.module.css'

const Alert: React.FC = () => (
  <div className={styles.alert}>
    <div className={styles.text}>
      <p>
        <AlertContent />
      </p>
    </div>
  </div>
)

export default Alert
