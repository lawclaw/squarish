import React from 'react';
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/material/Box";
import {useColorStore} from "../store/colorStore.ts";


const colors: string[] = [
    '#6d001a',
    '#be0039',
    '#ff4500',
    '#ffa800',
    '#ffd635',
    '#fff8b8',
    '#00a368',
    '#00cc78',
    '#7eed56',
    '#00756f',
    '#009eaa',
    '#00ccc0',
    '#2450a4',
    '#3690ea',
    '#51e9f4',
    '#493ac1',
    '#6a5cff',
    '#94b3ff',
    '#811e9f',
    '#b44ac0',
    '#e4abff',
    '#de107f',
    '#ff3881',
    '#ff99aa',
    '#6d482f',
    '#9c6926',
    '#ffb470',
    '#000000',
    '#515252',
    '#898d90',
    '#d4d7d9',
    '#ffffff'];


const ColorBar = () => {
    const setSelectedColor = useColorStore(state => state.setSelectedColor);
    const selectedColor = useColorStore(state => state.selectedColor);

    return (
        <Grid container spacing={3}>
            <Grid xs={12} display="flex" justifyContent="center" alignItems="center" sx={{marginBottom: '1em'}}>
                <Box
                    sx={{
                        width: '6em',
                        height: '6em',
                        borderRadius: 100,
                        bgcolor: selectedColor,
                        filter: 'drop-shadow(2px 2px 1px #000000)',

                    }}
                />
            </Grid>
            <Grid container spacing={3} sx={{overflow: 'scroll', maxHeight: '90vh'}} className={'no-scrollbars'}
                  justifyContent="center" alignItems="center">
                {colors.map((color) => {
                    return (
                        <Grid xs={12} display="flex" justifyContent="center" alignItems="center">
                            <Box
                                sx={{
                                    width: '5em',
                                    height: '5em',
                                    borderRadius: 1,
                                    bgcolor: color,
                                    filter: 'drop-shadow(2px 2px 1px #000000)',
                                    '&:active': {
                                        boxShadow: 'inset 1px 1px 30px 1px '
                                    },
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}
                                onClick={() => {
                                    setSelectedColor(color)
                                }}
                            />
                        </Grid>)
                })}
            </Grid>
        </Grid>


    );
};

export default ColorBar;