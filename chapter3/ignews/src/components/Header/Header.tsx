import Image from 'next/image'
import { ActiveLink } from '../ActiveLink/Activelink'

import { SigninButton } from '../SigninButton'

import styles from './header.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="ig.news"
          width={109}
          height={31}
        />
        <nav>
          <ActiveLink
            activeClassName={styles.active}
            href="/"
            name="Home"
          ></ActiveLink>
          <ActiveLink
            activeClassName={styles.active}
            href="/posts"
            prefetch
            name="Posts"
          ></ActiveLink>
        </nav>

        <SigninButton />
      </div>
    </header>
  )
}
