import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface AboutDialogProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
    open: boolean;
}

export default function AboutDialog(props: AboutDialogProps) { //https://mui.com/material-ui/react-dialog/

    const handleClickOpen = () => {
        props.setOpen(true);
    };
    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    About Squarish
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <h4>Squarish is a Reddit r/place recreation made as part of the Advanced Web Technologies module (SET09103) at Edinburgh Napier University
                        </h4>
                    </Typography>
                    <Typography gutterBottom>
                        Front-end: React, TypeScript, MUI and Socket.io
                        <br/>
                        Back-end: Flask, Flask-socket.io
                    </Typography>
                    <Typography gutterBottom>
                        <h4>
                            How to use:
                        </h4>
                        Left-click: Change color of square
                        <br/>
                        Right-click: Eye drop select color on square

                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Got it
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
