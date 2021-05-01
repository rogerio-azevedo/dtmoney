import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react"
import { api } from "../services/api"

type Transaction = {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: Date
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get("http://localhost:3000/api/transactions")
      .then((response) => setTransactions(response?.data?.transactions))
  }, [])

  const createTransaction = async (transacionInput: TransactionInput) => {
    const response = await api.post("/transactions", transacionInput)

    const { transaction } = response.data

    console.log("trans", transaction)

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  return context
}
