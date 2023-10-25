import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import '../css/HomePage.css'
import {io, Socket} from "socket.io-client";
import {useStrictMode} from "react-konva";
import GridCanvas from '../components/GridCanvas.tsx';
import ButtonAppBar from '../components/ButtonAppBar.tsx';
import BasicSpeedDial from '../components/BasicSpeedDial.tsx';
import Grid from "@mui/system/Unstable_Grid";
import VirtualGrid from "../components/VirtualGrid.tsx";

const gridSize = 100;

function HomePage() {
    useStrictMode(true);

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


    return (
        <>
            <Grid container>
                <Grid xs={12}>
                    <ButtonAppBar/>
                </Grid>
                <Grid xs={12}>
                    {/*<GridCanvas width={innerWidth - (innerWidth * 0.2)} height={innerHeight} borderSize={0.5}*/}
                    {/*            grid={Array.from(Array(gridSize), _ => Array(gridSize).fill('white'))}*/}
                    {/*            cellSize={10}/>*/}
                    <VirtualGrid/>
                    <BasicSpeedDial/>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage
