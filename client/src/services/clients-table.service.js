import axios from 'axios';

const API_PATH = process.env.API_PATH || 'http://localhost:5000/api';

const service = {
  getClients: () => axios
    .get(`${API_PATH}/clients`)
    .then((res) => res.data)
    .catch((err) => console.log(err)),
  removeClient: (id) => axios
    .delete(`${API_PATH}/client/${id}`)
    .then((res) => res)
    .catch((err) => console.log(err)),
};

export default service;
