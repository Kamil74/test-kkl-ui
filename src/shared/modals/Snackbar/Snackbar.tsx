import React from 'react';
import {Alert, AlertColor, Slide, SlideProps, Snackbar as MuiSnackbar} from '@mui/material';
import {snackbarStore} from "./snackbarStore";

type TransitionProps = Omit<SlideProps, 'direction'>;
function Transition(props: TransitionProps) {
    return <Slide {...props} direction="down"/>;
}
export const Snackbar = () => {
    const [message, severity, isOpen, close] = snackbarStore((state) => [state.message, state.severity, state.isOpen, state.close]);
    const transition = React.useMemo(() => Transition, []);
    return (
        <MuiSnackbar open={isOpen}
            autoHideDuration={4000}
            onClose={close}
            TransitionComponent={transition}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={severity as AlertColor} sx={{ width: '100%' }} onClose={close}>
                {message}
            </Alert>
        </MuiSnackbar>
    );
};


