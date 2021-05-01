import { useContext, useEffect, useState } from "react"
import incomeIgm from "../../assets/income.svg"
import outcomeIgm from "../../assets/outcome.svg"
import totalIgm from "../../assets/total.svg"
import { TransactionsContext } from "../../TransactionsContext"

import { Container } from "./styles"

export const Summary = () => {
  const [income, setIncome] = useState<number>(0)
  const [outcome, setOutcome] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const transactions = useContext(TransactionsContext)

  useEffect(() => {
    const incomes = transactions
      ?.filter((t) => t.type === "deposit")
      ?.reduce((acc, val) => {
        return acc + val.amount
      }, 0)

    const outcomes = transactions
      ?.filter((t) => t.type === "withdraw")
      ?.reduce((acc, val) => {
        return acc + val.amount
      }, 0)

    setIncome(incomes)
    setOutcome(outcomes)
    setTotal(incomes - outcomes)
  }, [transactions])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIgm} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(income)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIgm} alt="Saidas" />
        </header>
        <strong>
          -{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(outcome)}
        </strong>
      </div>

      <div className="highlight-backgroud">
        <header>
          <p>Saldo</p>
          <img src={totalIgm} alt="Total" />
        </header>
        <strong>
          {" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </strong>
      </div>
    </Container>
  )
}
