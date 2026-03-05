import { useQuery } from '@tanstack/react-query'
// import { get } from '../lib/api'
import {get} from '../lib/api'

export function useRecentActivity() {
  return useQuery({
    queryKey: ['activity'],
    queryFn: () => get('/api/activity'),
    refetchInterval: 30000 // refresh every 30s
  })
}