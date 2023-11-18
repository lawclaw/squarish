import {io, Socket} from "socket.io-client";
import {create, StoreApi} from 'zustand'
import {isNumber} from "./utils.ts";

export interface SocketStore {
    grid: string[][];
    actions: {
        changeColorLocal: (row: number, col: number, color: string) => void,
        changeColorGlobal: (row: number, col: number, color: string) => void,
    };
}


export const useSocketStore = create<SocketStore>((set: StoreApi<SocketStore>['setState']) => {
    let socket: Socket;
    if (localStorage.getItem('access_token')) {
        socket = io(':3030', {withCredentials: true, extraHeaders: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 'Access-Control-Allow-Private-Network': 'true'}})
    } else {
        socket = io(':3030')
    }
    socket.on("change_color", (data) => {
        if (isNumber(data['row']) && isNumber(data['col']) && data['color']) {
            changeColorLocal(data['row'], data['col'], data['color'])
        } else {
            console.warn(data)
        }

    })

    socket.on("connected", (data) => {
        set(() => ({grid: JSON.parse(data)}))
    })

    socket.on("status", (data) => {
        console.log(data)
    })

    const changeColorLocal = (row: number, col: number, color: string) => {
        set((state) => {
            const temp = JSON.parse(JSON.stringify(state.grid)) //dirty way to clone but works for now
            temp[row][col] = color
            return {grid: temp}
        })
    }
    const changeColorGlobal = (row: number, col: number, color: string) => {
        socket.emit('change_color', {'row': row, 'col': col, 'color': color})
    }


    return {
        grid: [],
        actions: {
            changeColorLocal: changeColorLocal,
            changeColorGlobal: changeColorGlobal
        }
    }
});


