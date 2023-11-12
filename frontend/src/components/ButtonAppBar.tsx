import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";
import {useSocketStore} from "../store/socketStore.ts";
import {useAuthStore} from "../store/authStore.ts";


export default function ButtonAppBar() {
    const actions = useSocketStore((state) => state.actions)
    const loggedIn = useAuthStore((state) => state.accessToken)
    const setAccessToken = useAuthStore(state => state.setAccessToken)
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        place
                    </Typography>
                    {loggedIn ? (
                        <>
                            <Button onClick={() => {
                                localStorage.removeItem('access_token')
                                setAccessToken(false)
                            }} variant={"contained"}>
                                Sign out
                            </Button>

                        </>
                    ) : (
                        <Button href={'/login'} variant={"contained"}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
