import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DiffView from "./diff-view";
import Button from '@mui/material/Button';

const DiffDialogView = (props: any) => {
    const {open, onClose, oldAsset, newAsset, dropDown} = props;
    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth={"md"}>
                <DialogTitle>Difference View</DialogTitle>
                <DialogContent>
                    {dropDown}
                    <DiffView oldValue={oldAsset} newValue={newAsset}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default DiffDialogView;