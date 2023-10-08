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
import Grid from "@mui/system/Unstable_Grid";
import {useStrictMode} from "react-konva";

useStrictMode(true)

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
            <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Grid xs={12}>
                    <ButtonAppBar/>
                </Grid>

                <Grid xs={12}>
                    <TestZoom/>

                </Grid>


            </Grid>

        </>
    )
}

export default App
