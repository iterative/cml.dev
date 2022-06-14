import React from 'react'
import SmartLink from '../../../atoms/SmartLink'
import { ReactComponent as VsCodeIcon } from '@media/icons/vscode.svg'
import * as styles from './styles.module.css'

const Alert: React.FC = () => (
  <div className={styles.alert}>
    <div className={styles.text}>
      <VsCodeIcon className={styles.textSvg} width="14" height="14" />
      <p>
        Check out our{' '}
        <SmartLink href="https://marketplace.visualstudio.com/items?itemName=Iterative.dvc">
          new VS Code extension
        </SmartLink>{' '}
        for experiment tracking and model development
      </p>
    </div>
  </div>
)

export default Alert
