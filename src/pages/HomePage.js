import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { adicionarTransacaoDeEntrada, adicionarTransacaoDeSaida, obterTransacoesDoUsuario } from "../arquivo";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();
  const token = location.state?.token;
  const [nome, setNome] = useState("");
  const [transacoes, setTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const handleLogout = () => {
  };
  const handleNovaTransacao = () => {
  };
  useEffect(() => {
    async function carregarInformacoesUsuario() {
      try {
        const usuario = await obterTransacoesDoUsuario(token);
        setNome(usuario.nome);
        const transacoesDoUsuario = usuario.transacoes;
        setTransacoes(transacoesDoUsuario);
        const saldoDoUsuario = transacoesDoUsuario.reduce(
          (saldo, transacao) => saldo + transacao.valor,
          0
        );
        setSaldo(saldoDoUsuario);
      } catch (error) {
        console.error(error);
      }
    }
    carregarInformacoesUsuario();
  }, [token]);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit onClick={handleLogout} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transacoes.map((transacao) => (
            <ListItemContainer key={transacao.id}>
              <div>
                <span>{transacao.data}</span>
                <strong>{transacao.descricao}</strong>
              </div>
              <Value color={transacao.valor > 0 ? "positivo" : "negativo"}>
                {transacao.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo > 0 ? "positivo" : "negativo"}>
            {saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={handleNovaTransacao}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={handleNovaTransacao}>
          <AiOutlineMinusCircle />
          <p>Nova <br /> saída</p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`