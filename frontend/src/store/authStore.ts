import {create} from 'zustand'

export const useAuthStore = create((set) => {
    return {
        accessToken: localStorage.getItem('access_token') || false,
        setAccessToken: (accessToken) => set((state) => ({accessToken: accessToken}))
    }
})