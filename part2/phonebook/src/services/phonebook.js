import axios from 'axios'

const baseUrl = 'api/persons'

const getAll = () => axios.get(baseUrl).then(result => result.data)

const create = (newEntry) =>
  axios.post(baseUrl, newEntry).then(result => result.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(result => result.data)

export default { getAll, create, remove, update }