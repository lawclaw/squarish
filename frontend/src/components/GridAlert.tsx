import React from 'react';
import {Alert, Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useSocketStore} from "../store/socketStore.ts";

const GridAlert = () => {
    const errorMessage = useSocketStore((state) => state.errorMessage)
    const setErrorMessage = useSocketStore(state => state.actions.changeErrorMessage)
    return (
        <Collapse in={!!errorMessage}
                  timeout={{
                      enter: 1000,
                      exit: 1000
                  }}
                  addEndListener={() => {
                      setTimeout(() => {
                            setErrorMessage('')
                      }, 30000);
                  }}>
            <Alert
                severity={'error'}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setErrorMessage('')
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
                sx={{mb: 2}}
            >
                {errorMessage}
            </Alert>
        </Collapse>
    );
};

export default GridAlert;