import * as React from 'react'
import '../css/HomePage.css'
import ButtonAppBar from '../components/ButtonAppBar.tsx';
import BasicSpeedDial from '../components/BasicSpeedDial.tsx';
import Grid from "@mui/system/Unstable_Grid";
import VirtualGrid from "../components/VirtualGrid.tsx";
import ColorBar from '../components/ColorBar.tsx';

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
                    <VirtualGrid/>
                </Grid>

                <BasicSpeedDial/>
            </Grid>
        </>
    )
}

export default HomePage
