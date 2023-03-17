import { Container } from './styles'

import incomeImage from '../../assets/entradas.svg'
import outcomeImage from '../../assets/saidas.svg'
import totalImage from '../../assets/total.svg'

export function Summary() {
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
        <strong>R$1000,00</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img
            src={outcomeImage}
            alt="Saidas"
          />
        </header>
        <strong>-R$500,00</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img
            src={totalImage}
            alt="Total"
          />
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  )
}
