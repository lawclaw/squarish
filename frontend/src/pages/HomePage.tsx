import * as React from 'react'
import '../css/HomePage.css'
import ButtonAppBar from '../components/ButtonAppBar.tsx';
import Grid from "@mui/system/Unstable_Grid";
import VirtualGrid from "../components/VirtualGrid.tsx";
import ColorBar from '../components/ColorBar.tsx';
import {Alert, Collapse, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function HomePage() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <ButtonAppBar/>

                </Grid>
                <Grid xs={1} alignItems={"stretch"}>
                    <ColorBar/>
                </Grid>
                <Grid xs={11}>
                    <Collapse in={true}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                    }}
                                >
                                    <CloseIcon fontSize="inherit"/>
                                </IconButton>
                            }
                            sx={{mb: 2}}
                        >
                            Close me!
                        </Alert>
                    </Collapse>
                    <VirtualGrid/>

                </Grid>
            </Grid>
        </>
    )
}

export default HomePage
