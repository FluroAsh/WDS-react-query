import Head from 'next/head'
import { useQueryClient } from '@tanstack/react-query'
import { PostsList1 } from '@/components/PostsList1'
import { useState } from 'react'
import PostsList2 from '@/components/PostsList2'
import { CreatePost } from '@/components/CreatePost'
import { PostListPaginated } from '@/components/PostsListPaginated'
import { PostListInfinite } from '@/components/PageListInfinite'
import Post from '@/components/Post'
import { getPost } from './api/posts'

export type Posts = { id: number | string; title: string }[]
export type Post = Posts[0] | undefined

export default function Home() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />)
  const queryClient = useQueryClient()
  // Prefetch the first post data before rendering the Post page with an id of 1
  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery({
      queryKey: ['post', 1],
      queryFn: () => getPost(1)
    })
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button
        style={{ marginBottom: '1.2rem' }}
        onClick={() => setCurrentPage(<PostsList2 />)}
      >
        Posts List 2
      </button>
      <button
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      {currentPage}
    </div>
  )
}
