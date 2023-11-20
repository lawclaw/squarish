import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

export interface ColorStore {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}


export const useColorStore = create<ColorStore>()(
    persist(
        (set) => ({
            selectedColor: '#ffffff',
            setSelectedColor: (color: string) => set(() => ({selectedColor: color}))
        }),
        {
            name: 'color-store',
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)

