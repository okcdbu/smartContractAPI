import {Create, TextInput, SimpleForm, useNotify, Toolbar, SaveButton, useCreate} from "react-admin";
import Button from '@mui/material/Button';
import React from "react";
import {useNavigate} from "react-router-dom";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {useWatch} from "react-hook-form";

const TransactionView = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm toolbar={<StartTransactionToolBar/>}>
                <TextInput source="id" style={{display:"none"}}/>
                <TextInput source="asset_id" label="Asset ID"/>
                <TextInput source="new_owner" label="New Owner"/>
            </SimpleForm>
        </Create>
    )
};

const StartTransactionToolBar = (props: any) => {
    const [create, {isLoading, error}] = useCreate();
    const transactionData = {
        asset_id: useWatch({name: 'asset_id'}),
        new_owner: useWatch({name: 'new_owner'})
    }
    const handleClick = () => {
        create('smart-contracts/transaction', {data: transactionData})
    }
    return (
        <Toolbar>
            <Button onClick={handleClick} startIcon={<ReceiptLongIcon/>}>
                Create Transaction
            </Button>
        </Toolbar>
    )
};
export default TransactionView;