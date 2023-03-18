import { useTransactions } from '../hooks/useTransactionsTransactions'
import { Container } from './styles'

export function TransactionsTable() {
  const { transactions } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(
            ({ id, title, amount, type, createdAt, category }) => {
              return (
                <tr key={id}>
                  <td>{title}</td>
                  <td className={type === 'deposit' ? 'deposit' : 'withdraw'}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(amount)}
                  </td>
                  <td>{category}</td>
                  <td>
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(createdAt)
                    )}
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </Container>
  )
}
