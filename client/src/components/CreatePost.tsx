import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import type { FormEvent, RefObject } from 'react'
import { createPost } from '@/pages/api/posts'
import Post from './Post'

export function CreatePost({ setCurrentPage }: any) {
  const titleRef: RefObject<HTMLInputElement> = useRef(null)
  const bodyRef: RefObject<HTMLInputElement> = useRef(null)

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // "setQueryData" will update the cache without refetching (data = newPost)
      queryClient.setQueryData(['posts', newPost.id], newPost)
      // "exact" will only invalidate the exact query key (not starting with "posts" key)
      queryClient.invalidateQueries(['posts'], { exact: true })
      setCurrentPage(<Post id={newPost.id} />)
    }
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (titleRef.current && bodyRef.current) {
      createPostMutation.mutate({
        title: titleRef.current.value,
        body: bodyRef.current.value
      })
    }
  }
  ;``
  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  )
}
