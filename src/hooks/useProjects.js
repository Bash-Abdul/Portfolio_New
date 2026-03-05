import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, put, del } from '../lib/api'

export function useAllProjects() {
  return useQuery({
    queryKey: ['projects', 'all'],
    queryFn: () => get('/api/projects/admin/all')
  })
}

export function usePublishedProjects() {
  return useQuery({
    queryKey: ['projects', 'published'],
    queryFn: () => get('/api/projects')
  })
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => get('/api/projects/featured')
  })
}

export function useProject(slug) {
  return useQuery({
    queryKey: ['projects', slug],
    queryFn: () => get(`/api/projects/${slug}`),
    enabled: !!slug
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => post('/api/projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => put(`/api/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => del(`/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

export function useProjectsCount() {
  return useQuery({
    queryKey: ['projects', 'count'],
    queryFn: () => get('/api/projects/count')
  })
}