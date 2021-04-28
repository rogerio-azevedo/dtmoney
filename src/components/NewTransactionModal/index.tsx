import { FormEvent, useEffect, useState } from "react"
import Modal from "react-modal"
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { api } from "../../services/api"

import { Container, TransactionTypeContainer, ButtonType } from "./styles"

interface newTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

// type Transaction = {
//   id: number
//   title: string
//   amount: number
//   type: string
//   category: string
//   createdAt: Date
// }

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: newTransactionModalProps) => {
  const [type, setType] = useState("deposit")
  const [title, setTitle] = useState("")
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState("")

  const handleCreateNewTransaction = (event: FormEvent) => {
    event.preventDefault()

    const data = {
      title,
      value,
      category,
      type,
    }

    api.post("/transactions", data)
    //console.log(transaction)
  }

  useEffect(() => {
    //console.log(title)
  }, [title])

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
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
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
