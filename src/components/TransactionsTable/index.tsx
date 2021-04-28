import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { Container } from "./styles"

type Transactions = {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api
      .get("http://localhost:3000/api/transactions")
      .then((response) => setTransactions(response?.data?.transactions))
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
          {transactions?.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td className={item.type}>{item.amount}</td>
              <td>{item.category}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
