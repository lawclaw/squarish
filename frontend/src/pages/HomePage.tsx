import * as React from 'react'
import '../css/HomePage.css'
import ButtonAppBar from '../components/ButtonAppBar.tsx';
import Grid from "@mui/system/Unstable_Grid";
import VirtualGrid from "../components/VirtualGrid.tsx";
import ColorBar from '../components/ColorBar.tsx';
import GridAlert from '../components/GridAlert.tsx';
import {useCoordinatesStore} from "../store/coordinatesStore.ts";
import { Box } from '@mui/material';

function HomePage() {
    const coordinates = useCoordinatesStore(state => state.coordinates)
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
                    <GridAlert/>
                    <VirtualGrid/>
                    <Box sx={{position: 'absolute', bottom: 40, right: 50, fontSize:'2em', background: 'grey', borderRadius: '20%'
                        }} p={2}>
                        {`${coordinates.row} ${coordinates.col}`}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage
