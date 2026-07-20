import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post } from '../lib/api'

export function useBlogPosts(params = {}) {
  return useQuery({
    queryKey: ['blog', 'posts', params],
    queryFn: () => get('/api/blog', params)
  })
}

export function useBlogPost(slug) {
  return useQuery({
    queryKey: ['blog', 'post', slug],
    queryFn: () => get(`/api/blog/${slug}`),
    enabled: !!slug
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog', 'categories'],
    queryFn: () => get('/api/blog/categories')
  })
}

export function useBlogCount() {
  return useQuery({
    queryKey: ['blog', 'count'],
    queryFn: () => get('/api/blog/count')
  })
}

export function useSyncBlog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => post('/api/blog/sync'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

export function useLastSynced() {
    return useQuery({
      queryKey: ['blog', 'lastSynced'],
      queryFn: () => get('/api/blog?limit=1')
    })
  }
