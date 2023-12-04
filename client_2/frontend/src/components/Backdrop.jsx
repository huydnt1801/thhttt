import { Backdrop as Backdrop_, CircularProgress } from '@mui/material';
import { createRef, useState } from 'react';

const backdropRef = createRef();

const Backdrop = () => {

    const [open, setOpen] = useState(false);
    const [config, setConfig] = useState({

    })
    backdropRef.current = {
        show: () => {
            setOpen(true);
        },
        hide: () => {
            setOpen(false);
        }
    }

    return (
        <Backdrop_
            sx={{ color: '#fff', zIndex: 3000 }}
            open={open}
            onClick={undefined}
        >
            <CircularProgress color="inherit" />
        </Backdrop_>
    )
}

export { Backdrop, backdropRef }