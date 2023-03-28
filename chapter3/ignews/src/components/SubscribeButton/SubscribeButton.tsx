import { api } from '@/services/api'
import { getStripeJS } from '@/services/stripe-js'
import { signIn, useSession } from 'next-auth/react'

import styles from './SubscribeButton.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const reponse = await api.post('/subscribe')

      const { sessionId } = reponse.data

      const stripe = await getStripeJS()

      stripe?.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <button
      className={styles.subscribeButton}
      type="button"
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}
