import React from "react"
import ReactDOM from "react-dom"
import { createServer, Model } from "miragejs"
import { App } from "./App"

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Desenvolvimento Web",
          amount: 6000,
          category: "Dev",
          type: "deposit",
          createdAt: new Date("2021-04-02 09:00:00"),
        },
        {
          id: 2,
          title: "Salário desenvolvedores",
          amount: 8000,
          category: "Dev",
          type: "withdraw",
          createdAt: new Date("2021-04-25 08:00:00"),
        },
      ],
    })
  },

  routes() {
    this.namespace = "api"

    this.get("/transactions", () => {
      return this.schema.all("transaction")
    })

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create("transaction", { ...data, createdAt: new Date() })
    })
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
