import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";
import {getCookie, logout} from "../service/ApiCalls.ts";
import {Socket} from "socket.io-client";

export interface ButtonAppBarProps {
    socketio: Socket<any, any> | undefined;
}

export default function ButtonAppBar(props: ButtonAppBarProps) {
    const [loggedIn, setLoggedIn] = useState<boolean>(getCookie('csrf_access_token') !== undefined);
    if (loggedIn) {
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            place
                        </Typography>
                        <Button onClick={async () => {
                            if (await logout()) {
                                setLoggedIn(false)
                            }
                        }} variant={"contained"}>Sign out</Button>

                    </Toolbar>
                </AppBar>
            </Box>
        );
    } else {
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            place
                        </Typography>
                        <Button variant={"contained"} onClick={() => {
                            props.socketio?.emit('test', {'row': 0, 'col': 0, 'color':'#123222'})
                        }}>Send message</Button>
                        <Button href={'/login'} variant={"contained"}>Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

}