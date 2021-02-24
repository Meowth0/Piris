import axios from 'axios';

const API_PATH = process.env.API_PATH || 'http://localhost:5000/api';

const service = {
  // createClient: (client) => axios
  //   .post(`${API_PATH}/client`, client)
  //   .then((res) => res.data)
  //   .catch((err) => console.log(err)),
  getPercentAccount: (depositId) => axios
    .get(`${API_PATH}/percent-account/${depositId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  getCurrentAccount: (depositId) => axios
    .get(`${API_PATH}/current-account/${depositId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  getCash: () => axios
    .get(`${API_PATH}/cash`)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  changePercentAccount: (curAccount, params) => axios
    .post(`${API_PATH}/percent-account/${curAccount.depositId}`, params)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  changeCurrentAccount: (curAccount, params) => axios
    .post(`${API_PATH}/current-account/${curAccount.depositId}`, params)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  changeCash: (params) => axios
    .post(`${API_PATH}/cash`, params)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  changeFond: (params) => axios
    .post(`${API_PATH}/fond`, params)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  getDeposits: (id) => axios
    .get(`${API_PATH}/client/${id}/deposits`)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  createDeposit: (deposit) => axios
    .post(`${API_PATH}/deposit`, deposit)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  createAccount: (account) => axios
    .post(`${API_PATH}/accounts`, account)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  getDeposit: (depositId) => axios
    .get(`${API_PATH}/deposits/${depositId}`)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
};

export default service;
