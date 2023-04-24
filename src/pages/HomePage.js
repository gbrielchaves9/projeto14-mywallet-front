import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { adicionarTransacaoDeEntrada, adicionarTransacaoDeSaida,obterTransacoesDoUsuario,} from "../arquivo";

export default function HomePage() {
  const [usuario, setUsuario] = useState({});
  const [transacoes, setTransacoes] = useState([]);
  function calculaSaldo(transacoes) {
    const soma = transacoes.reduce((acc, transacao) => {
      return transacao.tipo === "entrada" ? acc + transacao.valor : acc - transacao.valor;
    }, 0);
    return soma.toFixed(2);
  }
  useEffect(() => {
    async function carregarTransacoes() {
      try {
        const transacoesDoUsuario = await obterTransacoesDoUsuario(usuario.id);
        setTransacoes(transacoesDoUsuario);
      } catch (error) {
        console.log(error);
        alert("Erro ao carregar transações.");
      }
    }
    if (usuario.id) {
      carregarTransacoes();
    }
  }, [usuario]);

  const handleLogout = () => {
    setUsuario({});
  };

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {usuario.nome}</h1>
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
              <Value color={transacao.tipo === "saida" ? "negativo" : "positivo"}>
                {transacao.valor}
              </Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>{calculaSaldo(transacoes)}</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova saída</p>
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