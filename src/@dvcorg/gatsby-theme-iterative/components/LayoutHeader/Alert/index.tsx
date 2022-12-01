import React from 'react'
import SmartLink from '../../../../../components/atoms/SmartLink'
import * as styles from './styles.module.css'

const Alert: React.FC = () => (
  <div className={styles.alert}>
    <div className={styles.text}>
      <span className={styles.icon} role="img" aria-label="rocket">
        🚀
      </span>{' '}
      <p>
        New Release!{' '}
        <SmartLink href="https://iterative.ai/blog/iterative-studio-model-registry">
          Git-backed Machine Learning Model Registry
        </SmartLink>{' '}
        for all your model management needs.
      </p>
    </div>
  </div>
)

export default Alert
