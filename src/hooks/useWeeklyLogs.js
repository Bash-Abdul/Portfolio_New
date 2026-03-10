import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {get, post, put, del} from '../lib/api'

export function useWeeklyLogs(){
    return useQuery({
        queryKey: ['weekly-logs'],
        queryFn: ()=> get('/api/weekly-logs')
    })
}

export function useWeeklyLogsLatest(){
    return useQuery({
        queryKey: ['weekly-logs', 'latest'],
        queryFn: () => get('/api/weekly-logs/latest')
    })
}

export function useCreateWeeklyLogs(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => post('/api/weekly-logs', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weekly-logs'] })
            queryClient.invalidateQueries({ queryKey: ['activity'] })
        } 
    })
}

export function useUpdateWeeklyLogs(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}) => put(`/api/weekly-logs/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weekly-logs'] })
            queryClient.invalidateQueries({ queryKey: ['activity'] })
        } 
    })
}

export function useDeleteWeeklyLogs(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => del(`/api/weekly-logs/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['weekly-logs'] })
            queryClient.invalidateQueries({ queryKey: ['activity'] })
        } 
    })
}