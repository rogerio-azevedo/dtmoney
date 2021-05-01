import { FormEvent, useState } from "react"
import Modal from "react-modal"

import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { useTransactions } from "../../hooks/useTransactions"

import { Container, TransactionTypeContainer, ButtonType } from "./styles"

interface newTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: newTransactionModalProps) => {
  const { createTransaction } = useTransactions()

  const [type, setType] = useState("deposit")
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState("")

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault()

    await createTransaction({
      type,
      title,
      amount,
      category,
    })

    setType("deposit")
    setTitle("")
    setAmount(0)
    setCategory("")

    onRequestClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        className="react-modal-close"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="Fechar" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          placeholder="Título"
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
          <ButtonType
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => setType("deposit")}
          >
            <img src={incomeImg} alt="Credito" />
            <span>Entrada</span>
          </ButtonType>

          <ButtonType
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => setType("withdraw")}
          >
            <img src={outcomeImg} alt="Debito" />
            <span>Saída</span>
          </ButtonType>
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
