import axios from 'axios'

export function getUser(id: number | string) {
  return axios.get(`http://localhost:3000/users/${id}`).then((res) => res.data)
}
