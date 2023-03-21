import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './SigninButton.module.scss'

export function SigninButton() {
  const isUserLoggerdIn = true

  return (
    <button
      className={styles.signinButton}
      type="button"
    >
      <FaGithub color={isUserLoggerdIn ? '#04d361' : '#eba417'} />
      {isUserLoggerdIn ? 'Pedro Leão' : 'Sign in with Github'}
      {isUserLoggerdIn && (
        <FiX
          color="#737380"
          className={styles.closeIcon}
        />
      )}
    </button>
  )
}
