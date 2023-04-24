import styled from "styled-components";
import { useState } from "react";
import { adicionarTransacaoDeEntrada, adicionarTransacaoDeSaida } from "../arquivo";

export default function TransactionsPage() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState("entrada");

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleTipoTransacaoChange = (event) => {
    setTipoTransacao(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (tipoTransacao === "entrada") {
        await adicionarTransacaoDeEntrada(descricao, valor, token);
      } else {
        await adicionarTransacaoDeSaida(descricao, valor, token);
      }
      alert("Transação salva com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar transação.");
    }
  };

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleSubmit}>
        <select value={tipoTransacao} onChange={handleTipoTransacaoChange}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={handleValorChange}
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={handleDescricaoChange}
        />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
}
const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
