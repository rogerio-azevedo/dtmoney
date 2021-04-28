import { useEffect, useState } from "react"
import incomeIgm from "../../assets/income.svg"
import outcomeIgm from "../../assets/outcome.svg"
import totalIgm from "../../assets/total.svg"
import { api } from "../../services/api"

import { Container } from "./styles"

type Transactions = {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: Date
}

export const Summary = () => {
  const [table, setTable] = useState<Transactions[]>([])
  const [income, setIncome] = useState<number>(0)
  const [outcome, setOutcome] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    api
      .get("http://localhost:3000/api/transactions")
      .then((response) => setTable(response?.data?.transactions))
  }, [])

  useEffect(() => {
    const incomes = table
      ?.filter((t) => t.type === "deposit")
      ?.reduce((acc, val) => {
        return acc + val.amount
      }, 0)

    const outcomes = table
      ?.filter((t) => t.type === "withdraw")
      ?.reduce((acc, val) => {
        return acc + val.amount
      }, 0)

    setIncome(incomes)
    setOutcome(outcomes)
    setTotal(incomes - outcomes)
  }, [table])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIgm} alt="Entradas" />
        </header>
        <strong>{income}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIgm} alt="Saidas" />
        </header>
        <strong>-{outcome}</strong>
      </div>

      <div className="highlight-backgroud">
        <header>
          <p>Saldo</p>
          <img src={totalIgm} alt="Total" />
        </header>
        <strong>{total}</strong>
      </div>
    </Container>
  )
}
