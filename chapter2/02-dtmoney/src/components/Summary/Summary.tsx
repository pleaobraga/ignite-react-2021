import { Container } from './styles'

import incomeImage from '../../assets/entradas.svg'
import outcomeImage from '../../assets/saidas.svg'
import totalImage from '../../assets/total.svg'
import {
  useTransactions,
} from '../hooks/useTransactionsTransactions'

export function Summary() {
  const { transactions } = useTransactions()
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.withDraw += transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    { deposits: 0, withDraw: 0, total: 0 }
  )

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img
            src={incomeImage}
            alt="Entradas"
          />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img
            src={outcomeImage}
            alt="Saidas"
          />
        </header>
        <strong>
          -
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withDraw)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img
            src={totalImage}
            alt="Total"
          />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}
