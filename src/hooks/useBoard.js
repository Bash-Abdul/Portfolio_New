import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post, put, del } from '../lib/api'

// ── Board Projects ───────────────────────────────────────────

export function useBoardProjects() {
  return useQuery({
    queryKey: ['board-projects'],
    queryFn: () => get('/api/board')
  })
}

export function useCreateBoardProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => post('/api/board', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board-projects'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

export function useUpdateBoardProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => put(`/api/board/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board-projects'] })
    }
  })
}

export function useDeleteBoardProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => del(`/api/board/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board-projects'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

// ── Tickets ──────────────────────────────────────────────────

export function useTickets(boardProjectId) {
  return useQuery({
    queryKey: ['tickets', boardProjectId],
    queryFn: () => get(`/api/board/${boardProjectId}/tickets`),
    enabled: !!boardProjectId
  })
}

export function useCreateTicket(boardProjectId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => post(`/api/board/${boardProjectId}/tickets`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets', boardProjectId] })
      queryClient.invalidateQueries({ queryKey: ['board-projects'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

export function useUpdateTicket(boardProjectId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ ticketId, data }) => put(`/api/board/${boardProjectId}/tickets/${ticketId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets', boardProjectId] })
      queryClient.invalidateQueries({ queryKey: ['board-projects'] })
    }
  })
}

export function useDeleteTicket(boardProjectId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ticketId) => del(`/api/board/${boardProjectId}/tickets/${ticketId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets', boardProjectId] })
      queryClient.invalidateQueries({ queryKey: ['board-projects'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
    }
  })
}

export function useBoardCounts() {
    return useQuery({
      queryKey: ['board-counts'],
      queryFn: () => get('/api/board/counts')
    })
  }