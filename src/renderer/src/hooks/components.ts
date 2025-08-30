import { Component } from '@main/types/component'
import { useComponentsStore, useErrorStore } from '@renderer/stores'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'

// Search Components
export const useSearchComponents = (searchTerm: string): Component[] => {
  const { showError } = useErrorStore()
  const { components } = useComponentsStore()

  return useMemo(() => {
    try {
      if (!searchTerm) return components
      return components.filter((component) =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } catch (error) {
      console.error('Error searching components:', error)
      showError('Failed to search components. Please try again.')
      return []
    }
  }, [searchTerm, components, showError])
}

// Create Component Mutation
export const useAddComponent = () => {
  const { showError } = useErrorStore()
  const { addComponent } = useComponentsStore()

  return useMutation({
    mutationFn: async (componentData: Omit<Component, 'id' | 'createdAt' | 'updatedAt'>) => {
      return await window.api.components.addComponent(componentData)
    },
    onSuccess: (newComponent: Component) => addComponent(newComponent),
    onError: (error: Error) => {
      showError('Failed to add component.')
      console.error('Error adding component:', error)
      throw new Error('Failed to add component.')
    }
  })
}
