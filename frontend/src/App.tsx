import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import './App.css'
import {io, Socket} from "socket.io-client";
import TestZoom from "./components/TestZoom.tsx";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import ButtonAppBar from "./components/ButtonAppBar.tsx";
import {CssBaseline} from "@mui/material";

function App() {
    const [count, setCount] = useState(0)
    const [socketio, setSocketio] = useState<Socket<never, never>>();
    const canvasRef = useRef(null);
    useEffect(() => {
        const socket = io('localhost:8080')
        setSocketio(socket)

        socket.on("test", (data) => {
            console.log(data)
        })
        socket.on("disconnect", (data) => {
            console.log(data);
        });
        return function cleanup() {
            socket.disconnect();
        };
    }, []);

    const actions = [
        {icon: <FileCopyIcon/>, name: 'Copy'},
        {icon: <SaveIcon/>, name: 'Save'},
        {icon: <PrintIcon/>, name: 'Print'},
        {icon: <ShareIcon/>, name: 'Share'},
    ];
    return (
        <>
            <CssBaseline/>
            <ButtonAppBar/>
            <TestZoom/>
        </>
    )
}

export default App
