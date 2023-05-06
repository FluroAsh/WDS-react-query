import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getPostsPaginated } from '@/pages/api/posts'
import { Post } from '@/pages'

export function PostListPaginated() {
  const [page, setPage] = useState(1)

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ['posts', { page }],
    // keeps the "previous data" in the cache so we can navigate back to it
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page)
  })

  if (status === 'loading') return <h1>Loading...</h1>
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPreviousData && 'Previous Data'}</small>
      </h1>
      {data.posts.map((post: Post) => (
        <div key={post?.id}>{post?.title}</div>
      ))}
      {data.previousPage && (
        // Too lazy to fix the type errors 🙈
        <button onClick={() => setPage(data.previousPage as number)}>
          Previous
        </button>
      )}{' '}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage as number)}>Next</button>
      )}
    </>
  )
}
