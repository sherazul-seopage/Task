"use client"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

  const queryClient = new QueryClient()

  export default function TanstackProvider({children}) {
    return (
        <QueryClientProvider client={queryClient}>
          {
            children
          }
        </QueryClientProvider>
      )
  }