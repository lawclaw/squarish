import * as React from 'react'
import '../css/HomePage.css'
import ButtonAppBar from '../components/ButtonAppBar.tsx';
import Grid from "@mui/system/Unstable_Grid";
import VirtualGrid from "../components/VirtualGrid.tsx";
import ColorBar from '../components/ColorBar.tsx';
import GridAlert from '../components/GridAlert.tsx';

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
                    <GridAlert/>
                    <VirtualGrid/>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage
