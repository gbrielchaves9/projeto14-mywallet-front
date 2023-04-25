import styled from "styled-components";
import { useState } from "react";
import { adicionarTransacaoDeEntrada, adicionarTransacaoDeSaida } from "../arquivo";
import { useLocation, useNavigate } from "react-router-dom";

export default function TransactionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipoTransacao, setTipoTransacao] = useState(location.pathname.includes('entrada') ? 'entrada' : 'saida');

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (tipoTransacao === "entrada") {
        await adicionarTransacaoDeEntrada(descricao, valor, token);
      } else {
        await adicionarTransacaoDeSaida(descricao, valor, token);
      }
      navigate("/home", { state: { token } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TransactionContainer>
    
        <h1>{tipoTransacao === 'entrada' ? 'Nova entrada' : 'Nova saída'}</h1>
 
      <TransactionForm onSubmit={handleFormSubmit}>
        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          id="descricao"
          value={descricao}
          onChange={handleDescricaoChange}
        />

        <label htmlFor="valor">Valor</label>
        <input
          type="number"
          id="valor"
          value={valor}
          onChange={handleValorChange}
        />

        <button type="submit">{tipoTransacao === 'entrada' ? 'Salvar entrada' : 'Salvar saída'}</button>
      </TransactionForm>
    </TransactionContainer>
  );
}


const TransactionContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;



const TransactionForm = styled.form`
height: calc(100vh - 50px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;

`;
