import {create} from "zustand";

export interface Coordinates {
    row: number;
    col: number;
}
export interface CoordinatesStore {
    coordinates: Coordinates;
    setCoordinates: (coordinates: Coordinates) => void;
}

export const useCoordinatesStore = create<CoordinatesStore>((set) => {
    return {
        coordinates: {row: 0, col: 0},
        setCoordinates: (coordinates: Coordinates) => set(() => ({coordinates: coordinates}))
    }
})
