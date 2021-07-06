import cn from 'classnames'
import React from 'react'

import styles from './styles.module.css'

interface IHamburgerProps {
  opened?: boolean,
  isTop?: boolean,
}

const HamburgerIcon: React.FC<IHamburgerProps> = ({ opened, isTop }) => (
  <div className={cn(styles.wrapper, opened && styles.opened)}>
    <div className={cn(styles.line, styles.first, isTop && styles.lineWhite)} />
    <div className={cn(styles.line, styles.second, isTop && styles.lineWhite)} />
    <div className={cn(styles.line, styles.third, isTop && styles.lineWhite)} />
  </div>
)

export default HamburgerIcon
