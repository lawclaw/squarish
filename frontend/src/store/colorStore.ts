import {create} from 'zustand'

export const useColorStore = create((set) => {
    return {
        selectedColor: '#ffffff',
        setSelectedColor: (color) => set((state) => ({selectedColor: color}))
    }
})