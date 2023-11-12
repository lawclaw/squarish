import * as React from 'react'
import {useEffect, useState} from 'react'
import '../css/HomePage.css'
import {io, Socket} from "socket.io-client";
import ButtonAppBar from '../components/ButtonAppBar.tsx';
import BasicSpeedDial from '../components/BasicSpeedDial.tsx';
import Grid from "@mui/system/Unstable_Grid";
import VirtualGrid from "../components/VirtualGrid.tsx";

function HomePage() {

    const [socketio, setSocketio] = useState<Socket<any, any>>();
    useEffect(() => {
        const socket = io('127.0.0.1:3030')
        setSocketio(socket)
        socket.on("color_change", (data) => {
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
                    <ButtonAppBar socketio={socketio}/>
                </Grid>
                <Grid xs={12}>
                    <VirtualGrid/>
                    <BasicSpeedDial/>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage
