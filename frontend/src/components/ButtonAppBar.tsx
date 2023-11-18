import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, SvgIcon} from "@mui/material";
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
                    <SvgIcon sx={{display: {xs: 'none', md: 'flex'}, fontSize:'80px'}} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
                                <defs>
                                    <linearGradient
                                        id="a"
                                        x1="50%"
                                        x2="50%"
                                        y1="0%"
                                        y2="100%"
                                        gradientTransform="rotate(45 .5 .5)"
                                    >
                                        <stop offset="0%" stopColor="hsl(265, 55%, 20%)"/>
                                        <stop offset="100%" stopColor="hsl(265, 55%, 20%)" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <g fill="hsl(265, 55%, 20%)" shapeRendering="crispEdges">
                                    <path fill="url(#a)" d="m0 480 240-240v320L0 800z" opacity={0.45}/>
                                    <path fill="url(#a)" d="m0 800 240-240h320L320 800z" opacity={0.2}/>
                                    <path d="M240 240h320v320H240z"/>
                                </g>
                            </svg>
                        </SvgIcon>
                    <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                        Squarish
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
                        <Button href={'/login'} color={'inherit'}>Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
