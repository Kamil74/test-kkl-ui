import React from 'react';
import {Backdrop, CircularProgress,} from '@mui/material';
import {loaderStore} from "./loaderStore";

export const Loader = () => {
    const isOpen = loaderStore((state) => state.isOpen);
    return (
        <Backdrop
            sx={{
                backdropFilter: 'blur(5px)',
                color: (theme) => theme.palette.primary.main,
                bgcolor: 'rgba(255, 255, 255, 0.5)',
                zIndex: (theme) => theme.zIndex.snackbar + 1,
            }}
            open={isOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};
