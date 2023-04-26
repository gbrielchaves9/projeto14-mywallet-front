import axios from 'axios';

const URL = 'http://localhost:5000';

export async function cadastrarUsuario(nome, email, senha) {
  const data = { nome, email, senha };
  try {
    const response = await axios.post(`${URL}/cadastro`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function fazerLogin(email, senha) {
  const data = { email, senha };
  try {
    const response = await axios.post(`${URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function adicionarTransacaoDeEntrada(descricao, valor, token) {
  const data = { descricao, valor };
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(`${URL}/transacoes/entrada`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function adicionarTransacaoDeSaida(descricao, valor, token) {
  const data = { descricao, valor };
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(`${URL}/transacoes/saida`, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function obterTransacoesDoUsuario(token) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(`${URL}/transacoes`, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

