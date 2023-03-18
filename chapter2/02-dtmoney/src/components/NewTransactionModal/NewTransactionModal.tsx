import Modal from 'react-modal'

import closeImg from '../../assets/fechar.svg'
import IncomeImg from '../../assets/entradas.svg'
import OutcomeImg from '../../assets/saidas.svg'

import { Container, RadioBox, TransactionTypeContainer } from './styles'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../hooks/useTransactionsTransactions'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  function clearForm() {
    setTitle('')
    setAmount(0)
    setType('deposit')
    setCategory('')
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    const data = {
      type,
      title,
      amount,
      category,
    }

    await createTransaction(data)

    clearForm()

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img
          src={closeImg}
          alt="Fechar modal"
        />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Titulo"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType('deposit')
            }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img
              src={IncomeImg}
              alt="Entrada"
            />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {
              setType('withdraw')
            }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img
              src={OutcomeImg}
              alt="Saida"
            />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
