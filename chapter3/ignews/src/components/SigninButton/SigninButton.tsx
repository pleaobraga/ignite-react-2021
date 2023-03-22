import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from 'next-auth/react'

import styles from './SigninButton.module.scss'

export function SigninButton() {
  const { data: session } = useSession()

  return session ? (
    <button
      className={styles.signinButton}
      type="button"
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session?.user?.name}
    </button>
  ) : (
    <button
      className={styles.signinButton}
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      {'Sign in with Github'}
    </button>
  )
}
