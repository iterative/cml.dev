import React, { useEffect } from 'react'

import { IPageProps } from '../../organisms/Page'
import { handleFirstTab } from '../../../utils/front/accessibility'

import * as styles from './styles.module.css'

export enum LayoutModifiers {
  Wide,
  Collapsed,
  HideAlert
}

export interface ILayoutModifiable {
  modifiers?: Array<LayoutModifiers>
}

interface IMainLayoutProps {
  className?: string
}

export type LayoutComponent = React.FC<
  IMainLayoutProps & IPageProps & ILayoutModifiable
>

const MainLayout: LayoutComponent = ({ className, children }) => {
  useEffect(() => {
    if (className) {
      document.body.classList.add(className)

      return (): void => {
        document.body.classList.remove(className)
      }
    }
  }, [className])

  useEffect(() => {
    document.body.classList.add(styles.mainLayout)
    window.addEventListener('keydown', handleFirstTab)

    return (): void => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  return (
    <>
      <div id="layoutContent">{children}</div>
    </>
  )
}

export default MainLayout
