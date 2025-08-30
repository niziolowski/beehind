import { Component } from '@main/types/index'
import { create } from 'zustand'

interface ComponentsState {
  components: Component[]
  setComponents: (components: Component[]) => void
  initialize: () => void
}

export const useComponentsStore = create<ComponentsState>((set) => ({
  components: [],
  setComponents: (components) => set({ components }),
  initialize: async () => {
    try {
      const components = await window.api.components.getComponents()

      // Update state with initial values
      set({
        components: components ?? []
      })
    } catch (error) {
      throw new Error('Failed to initialize components store')
    }
  }
}))
