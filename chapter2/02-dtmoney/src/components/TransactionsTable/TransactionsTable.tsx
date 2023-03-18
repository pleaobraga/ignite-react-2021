import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Container } from './styles'

export function TransactionsTable() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    api.get('transactions').then((response) => {
      setTransactions(response.data)
    })
  }, [])

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
                    RS{amount},00
                  </td>
                  <td>{category}</td>
                  <td>{createdAt}</td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </Container>
  )
}
