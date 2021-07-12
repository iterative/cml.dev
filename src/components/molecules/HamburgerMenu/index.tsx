import cn from 'classnames'
import React, { useEffect, useState, useCallback, MouseEvent } from 'react'

import HamburgerIcon from '../HamburgerIcon'
import Link from '../../atoms/Link'
import { logEvent } from '../../../utils/front/ga'

import { getFirstPage } from '../../../utils/shared/sidebar'

import { ReactComponent as LogoSVG } from '@media/site-logo.svg'
import { ReactComponent as TwitterIcon } from '@media/icons/twitter.svg'
import { ReactComponent as GithubIcon } from '@media/icons/github.svg'
import { ReactComponent as MailIcon } from '@media/icons/mail.svg'
import { ReactComponent as DiscordIcon } from '@media/icons/discord.svg'

import styles from './styles.module.css'

const docsPage = getFirstPage()

export type HamburgerHelpers = {
  opened: boolean
  setOpened: (newState: boolean) => void
  handleToggle: () => void
  handleClose: () => void
  handleItemClick: (name?: string) => (e: MouseEvent) => void
}

export const useHamburgerMenu: () => HamburgerHelpers = () => {
  const [opened, setOpened] = useState(false)

  const handleToggle = useCallback(() => setOpened(!opened), [opened])

  const handleClose = useCallback(() => setOpened(false), [opened])

  const handleItemClick = useCallback(
    item => (): void => {
      handleClose()
      if (item) {
        logEvent('hamburger', item)
      }
    },
    []
  )

  useEffect(() => {
    const method = opened ? 'add' : 'remove'
    document.body.classList[method](styles.hiddenScrollbar)
  }, [opened])

  return {
    opened,
    setOpened,
    handleToggle,
    handleClose,
    handleItemClick
  }
}

export const HamburgerMenu: React.FC<
  Pick<HamburgerHelpers, 'opened' | 'handleItemClick' | 'handleToggle'> & {
    collapsed: boolean
  }
> = ({ opened, handleItemClick }) => {
  return (
    <div className={cn(styles.wrapper, opened && styles.opened)}>
      <div className={styles.logoRow}>
        <Link
          onClick={handleItemClick()}
          href="/"
          className={styles.logo}
          aria-label="Home"
        >
          <LogoSVG />
        </Link>
        <Link
          className={styles.company}
          href="https://iterative.ai/"
          target="_blank"
        >
          by <span className={styles.companyName}>iterative.ai</span>
        </Link>
      </div>
      <ul className={styles.sections}>
        <li className={styles.section}>
          <Link
            href="/#use-cases"
            className={styles.sectionHeading}
            onClick={handleItemClick('use-cases')}
          >
            Use Cases
          </Link>
        </li>
        <li className={styles.section}>
          <Link
            href={docsPage}
            className={styles.sectionHeading}
            onClick={handleItemClick('doc')}
          >
            Doc
          </Link>
        </li>
        <li className={styles.section}>
          <Link
            href="/doc/cml-with-npm"
            className={styles.sectionHeading}
            onClick={handleItemClick('install')}
          >
            Install
          </Link>
        </li>

        <li className={styles.section}>
          <div className={styles.sectionHeading}>Support</div>
          <ul className={styles.subSections}>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="mailto:support@dvc.org"
                target="_blank"
                onClick={handleItemClick('mail')}
              >
                <MailIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>E-Mail</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="https://github.com/iterative/cml"
                onClick={handleItemClick('github')}
                target="_blank"
              >
                <GithubIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>GitHub</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="https://dvc.org/chat"
                onClick={handleItemClick('chat')}
                target="_blank"
              >
                <DiscordIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>Discord</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link
                className={styles.subSectionLink}
                href="https://twitter.com/DVCorg"
                onClick={handleItemClick('twitter')}
                target="_blank"
              >
                <TwitterIcon className={styles.subSectionLinkImage} />
                <span className={styles.subSectionLinkTitle}>Twitter</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.section}>
          <p className={styles.sectionHeading}>All Tools</p>
          <ul className={styles.subSections}>
            <li className={styles.subSection}>
              <Link
                href="https://studio.iterative.ai/"
                className={styles.subSectionLink}
              >
                <img
                  className={styles.subSectionLinkImage}
                  src="/img/studio-icon.svg"
                  alt="Studio logo"
                />
                <span className={styles.subSectionLinkTitle}>Studio</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link href="https://dvc.org" className={styles.subSectionLink}>
                <img
                  className={styles.subSectionLinkImage}
                  src="/img/dvc-icon.svg"
                  alt="DVC logo"
                />
                <span className={styles.subSectionLinkTitle}>DVC</span>
              </Link>
            </li>
            <li className={styles.subSection}>
              <Link href="/" className={styles.subSectionLink}>
                <img
                  className={styles.subSectionLinkImage}
                  src="/img/cml-icon.svg"
                  alt="CML logo"
                />
                <span className={styles.subSectionLinkTitle}>CML</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <Link
        href="/doc/start"
        className={styles.linkButton}
        onClick={handleItemClick('get-started')}
      >
        Get started
      </Link>
    </div>
  )
}

export const HamburgerButton: React.FC<{
  opened: boolean
  collapsed: boolean
  handleClick: (e: MouseEvent) => void
}> = ({ opened, collapsed, handleClick }) => (
  <button
    className={cn(
      styles.toggleButton,
      collapsed || styles.expanded,
      opened && styles.opened
    )}
    onClick={handleClick}
    aria-label="Toggle Mobile Menu"
  >
    <HamburgerIcon opened={opened} />
  </button>
)
