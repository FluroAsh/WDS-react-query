import React from 'react'
import { getPost, getPosts } from '@/pages/api/posts'
import { useQuery, useQueries } from '@tanstack/react-query'
import { Post } from '@/pages'

export default function PostsList2() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  // Execute an array of queries for each post (based on its Post ID)
  // FYI: We need to do this as we can't execute the useQuery hook in a function...
  const queries = useQueries({
    queries: (postsQuery.data ?? []).map((post: Post) => {
      return {
        queryKey: ['posts', post?.id],
        queryFn: () => getPost(post?.id as string | number)
      }
    })
  })

  console.log(queries.map((q) => q.data))

  if (postsQuery.status === 'loading') return <h1>Loading...</h1>
  if (postsQuery.status === 'error') {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }

  console.log(postsQuery.fetchStatus)

  return (
    <div>
      <h1>Posts List 2</h1>
      <ol>
        {postsQuery.data.map((post: Post) => (
          <li key={post?.id}>{post?.title}</li>
        ))}
      </ol>
    </div>
  )
}
