import styles from './SubscribeButton.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button
      className={styles.subscribeButton}
      type="button"
    >
      Subscribe now
    </button>
  )
}
