import incomeIgm from "../../assets/income.svg"
import outcomeIgm from "../../assets/outcome.svg"
import totalIgm from "../../assets/total.svg"
import { useTransactions } from "../../hooks/useTransactions"

import { Container, SummaryText } from "./styles"

export const Summary = () => {
  const { transactions } = useTransactions()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.withdraws += transaction.amount
        acc.total -= transaction.amount
      }
      return acc
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  )

  // useEffect(() => {
  //   const incomes = transactions
  //     ?.filter((t) => t.type === "deposit")
  //     ?.reduce((acc, val) => {
  //       return acc + val.amount
  //     }, 0)

  //   const outcomes = transactions
  //     ?.filter((t) => t.type === "withdraw")
  //     ?.reduce((acc, val) => {
  //       return acc + val.amount
  //     }, 0)

  //   setIncome(incomes)
  //   setOutcome(outcomes)
  //   setTotal(incomes - outcomes)
  // }, [transactions])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIgm} alt="Entradas" />
        </header>
        <SummaryText negative={false}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary?.deposits)}
        </SummaryText>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIgm} alt="Saidas" />
        </header>
        <SummaryText negative={true}>
          -
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary?.withdraws)}
        </SummaryText>
      </div>

      <div className="highlight-backgroud">
        <header>
          <p>Saldo</p>
          <img src={totalIgm} alt="Total" />
        </header>
        <SummaryText negative={summary?.total < 0}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary?.total)}
        </SummaryText>
      </div>
    </Container>
  )
}
