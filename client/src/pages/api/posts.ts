import axios from 'axios'

export const getPosts = () => {
  return axios
    .get('http://localhost:3000/posts', {
      params: { _sort: 'title' }
    })
    .then((res) => res.data)
}

export function getPostsPaginated(page: number) {
  const limit = 2
  return axios
    .get('http://localhost:3000/posts', {
      params: { _page: page, _sort: 'title', _limit: limit }
    })
    .then((res) => {
      const hasNext = page * limit <= parseInt(res.headers['x-total-count'])
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data
      }
    })
}

export function getPost(id: number | string) {
  return axios.get(`http://localhost:3000/posts/${id}`).then((res) => res.data)
}

export function createPost({ title, body }: { title: string; body: string }) {
  return axios
    .post('http://localhost:3000/posts', {
      title,
      body,
      userId: 1,
      id: Date.now()
    })
    .then((res) => res.data)
}
