import {io, Socket} from "socket.io-client";
import {create, StoreApi} from 'zustand'
import {isNumber} from "./utils.ts";


export interface SquareChange {
    row: number;
    col: number;
    color: string;
}

export interface SocketStore {
    grid: string[][];
    previousChange?: SquareChange;
    errorMessage: string;
    actions: {
        changeErrorMessage: (message: string) => void;
        changeColorLocal: (change: SquareChange) => void;
        changeColorGlobal: (change: SquareChange) => void;
    };
}


export const useSocketStore = create<SocketStore>((set: StoreApi<SocketStore>['setState'], get: StoreApi<SocketStore>['getState']) => {
    let socket: Socket;
    if (localStorage.getItem('access_token')) {
        socket = io(':8080', {
            withCredentials: true,
            extraHeaders: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Access-Control-Allow-Private-Network': 'true'
            }
        })
    } else {
        socket = io(':8080')
    }
    socket.on("change_color", (data) => {
        if (isNumber(data['row']) && isNumber(data['col']) && data['color']) {
            changeColorLocal({row: data['row'], col: data['col'], color: data['color']})
        } else {
            changeErrorMessage(data.message)
            changeColorLocal(get().previousChange)
            set(() => {
                return {previousChange: undefined}
            })
        }

    })

    socket.on("connected", (data) => {
        set(() => ({grid: JSON.parse(data)}))
    })

    socket.on("status", (data) => {
        console.log(data)
    })

    const changeErrorMessage = (message: string) => {
        set(() => ({errorMessage: message}))
    }

    const changeColorLocal = (change?: SquareChange) => {
        if (change) {
            set((state) => {
                const temp = JSON.parse(JSON.stringify(state.grid)) //dirty way to clone but works for now
                temp[change.row][change.col] = change.color
                return {grid: temp, previousChange: {row: change.row, col:change.col, color: state.grid[change.row][change.col]}}
            })
        }
    }
    const changeColorGlobal = (change: SquareChange) => {
        socket.emit('change_color', change)
    }


    return {
        grid: [],
        previousChange: undefined,
        errorMessage: '',
        actions: {
            changeErrorMessage: changeErrorMessage,
            changeColorLocal: changeColorLocal,
            changeColorGlobal: changeColorGlobal
        }
    }
});


