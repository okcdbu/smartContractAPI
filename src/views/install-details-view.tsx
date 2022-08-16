import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const InstallationDetailsView = (props: any) => {
    const {open, onClose} = props

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Installation Details</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default InstallationDetailsView;