import { useComponentsStore, useErrorStore } from '@renderer/stores'
import { useQuery } from '@tanstack/react-query'

// Search Components Query
export const useSearchComponents = (searchTerm: string) => {
  const { showError } = useErrorStore()
  const { components } = useComponentsStore()
  return useQuery({
    queryKey: ['searchComponents', searchTerm, components],
    queryFn: async (query) => {
      try {
        const searchTerm = query.queryKey[1] as string
        if (!searchTerm) return components
        const filteredComponents = components.filter((component) =>
          component.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return filteredComponents
      } catch (error) {
        showError('Failed to search components. Please try again later.')
        console.error('Error searching components:', error)
        throw new Error('Failed to search components.')
      }
    },
    enabled: !!components.length,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })
}

// Create Component Mutation
// export const useCreateComponent = (component: Component) => {}
