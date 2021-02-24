import axios from 'axios';

const API_PATH = process.env.API_PATH || 'http://localhost:5000/api';

const service = {
  // createClient: (client) => axios
  //   .post(`${API_PATH}/client`, client)
  //   .then((res) => res.data)
  //   .catch((err) => console.log(err)),
  // updateClient: (id, client) => axios
  //   .put(`${API_PATH}/client/${id}`, client)
  //   .then((res) => res)
  //   .catch((err) => console.log(err)),
  // getClient: (id) => axios
  //   .get(`${API_PATH}/client/${id}`)
  //   .then((res) => res.data)
  //   .catch((err) => console.log(err)),
  getAccounts: () => axios
    .get(`${API_PATH}/accounts`)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
};

export default service;
