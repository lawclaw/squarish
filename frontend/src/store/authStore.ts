import {create} from 'zustand'

export interface AuthStore {
    accessToken: string | boolean;
    setAccessToken: (accessToken: string | boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => {
    return {
        accessToken: localStorage.getItem('access_token') || false,
        setAccessToken: (accessToken) => set(() => ({accessToken: accessToken}))
    }
})