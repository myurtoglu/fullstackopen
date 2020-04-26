import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(result => result.data)

const create = (newEntry) =>
  axios.post(baseUrl, newEntry).then(result => result.data)

export default { getAll, create }