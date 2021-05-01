import { Dashboard } from "./components/Dashboard"
import { Header } from "./components/Header"
import { NewTransactionModal } from "./components/NewTransactionModal"

import { useState } from "react"
import Modal from "react-modal"

import { GlobalStyle } from "./styles/global"
import { TransactionsProvider } from "./TransactionsContext"

Modal.setAppElement("#root")

export const App = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false
  )

  const handleOpenNewTransactionModal = () => {
    setIsNewTransactionModalOpen(true)
  }

  const handleCloseNewTransactionModal = () => {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  )
}
