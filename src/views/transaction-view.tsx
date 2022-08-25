import {Create, TextInput, SimpleForm, useNotify, Toolbar, SaveButton, useCreate} from "react-admin";
import Button from '@mui/material/Button';
import React from "react";
import {useNavigate} from "react-router-dom";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {useWatch} from "react-hook-form";
import {object} from "prop-types";
import { JsonField } from "react-admin-json-view";
import { json } from "stream/consumers";

const TransactionView = (props: any) => {
    const {assetStruct, onClose} = props
    JSON.stringify(assetStruct)
    console.log("string"+assetStruct)
    return (
        <Create {...props}>
            <SimpleForm toolbar={<StartTransactionToolBar onClose={onClose}/>}>
                <TextInput source="id" style={{display:"none"}}/>
                <TextInput source="asset_id" label="Asset ID"/>
                <TextInput source="new_owner" label="New Owner"/>
                <TextInput source="new_address" label="New Address"/>
                <TextInput source="new_size" label="New Size"/>     
                <TextInput source="new_salevalue" label="New SaleValue"/>
                <TextInput source="new_rentvalue" label="New RentValue"/>                
            </SimpleForm>
        </Create>
    )
};

const StartTransactionToolBar = (props: any) => {
    const {onClose} = props
    const [create, {isLoading, error}] = useCreate();
    const transactionData = {
        asset_id: useWatch({name: 'asset_id'}),
        new_owner: useWatch({name: 'new_owner'})
    }
    const handleClick = () => {
        create('smart-contracts/transaction', {data: transactionData})
        onClose()
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