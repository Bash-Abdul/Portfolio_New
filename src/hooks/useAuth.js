import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { get, post } from '../lib/api'
import { useNavigate } from 'react-router'

export function useMe() {
    return useQuery({
      queryKey: ['auth', 'me'],
      queryFn: () => get('/api/auth/me'),
      retry: false
    })
  }
  
  export function useLogin() {
    const navigate = useNavigate()
    return useMutation({
      mutationFn: (password) => post('/api/auth/login', { password }),
      onSuccess: () => navigate('/dashboard')
    })
  }
  
  export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: () => post('/api/auth/logout'),
      // onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ['me'] })
      //   // or even more aggressive — clear everything
      //   queryClient.clear()
      //   navigate('/login')
      // }
      onSuccess: () => {
        queryClient.clear()
        navigate('/login', { replace: true })
      },
      onError: () => {
        // even if logout fails, clear client state and redirect
        queryClient.clear()
        navigate('/login', { replace: true })
      }
    })
  }
