import {create} from 'zustand'

export interface ColorStore {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

export const useColorStore = create<ColorStore>((set) => {
    return {
        selectedColor: '#ffffff',
        setSelectedColor: (color: string) => set(() => ({selectedColor: color}))
    }
})