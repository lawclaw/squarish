import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";

export default function ButtonAppBar() {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        place
                    </Typography>
                    <Button href={'/login'} variant={"contained"}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}