import MainLayout from '@dvcorg/gatsby-theme-iterative/src/components/MainLayout'
import { PageProps } from 'gatsby'
import React from 'react'

import * as styles from './styles.module.css'

const NotFound = ({ location }: PageProps) => (
  <MainLayout location={location}>
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Not Found</h1>
      <div className={styles.content}>
        You just hit a route that doesn&#39;t exist... the sadness.
      </div>
    </div>
  </MainLayout>
)

export default NotFound
