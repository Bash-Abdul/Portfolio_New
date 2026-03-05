import { useQuery, useMutation } from '@tanstack/react-query'
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
    return useMutation({
      mutationFn: () => post('/api/auth/logout'),
      onSuccess: () => navigate('/login')
    })
  }