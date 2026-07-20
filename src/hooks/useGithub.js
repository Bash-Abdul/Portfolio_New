import { useQuery } from '@tanstack/react-query'
import { get } from '../lib/api'

export function useGithub() {
  return useQuery({
    queryKey: ['github'],
    queryFn: () => get('/api/github'),
    staleTime: 5 * 60 * 1000,
    retry: 1
  })
}
