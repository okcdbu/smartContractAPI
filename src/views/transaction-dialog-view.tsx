import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ReactJson from "react-json-view";
import TransactionView from "./transaction-view";

const TransactionDialogView = (props: any) => {
    const {open, onClose, jsonSrc} = props;
    return (
        <div>
            <Dialog open={open} onClose={onClose} maxWidth={"md"}>
                <DialogTitle>Create New Transaction</DialogTitle>
                <DialogContent>
                    <ReactJson src={jsonSrc} displayDataTypes={false}/>
                    <TransactionView/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default TransactionDialogView;