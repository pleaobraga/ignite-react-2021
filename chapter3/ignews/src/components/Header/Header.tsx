import Image from 'next/image'

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
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>

        <SigninButton />
      </div>
    </header>
  )
}
