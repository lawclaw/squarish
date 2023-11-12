import {io} from "socket.io-client";
import {create} from 'zustand'

export const useSocketStore = create((set) => {
    let socket;
    if (localStorage.getItem('access_token')) {
        socket = io('127.0.0.1:3030', {extraHeaders: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})

    } else {
        socket = io('127.0.0.1:3030')
    }
    socket.on("change_color", (data) => {
        if (data['row'] && data['col'] && data['color']) {
            changeColorLocal(data['row'], data['col'], data['color'])
        } else {
            console.warn(data)
        }

    })

    socket.on("connected", (data) => {
        set((state) => ({grid: JSON.parse(data)}))
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


