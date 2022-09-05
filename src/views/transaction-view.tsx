import {Create, TextInput, SimpleForm, useNotify, Toolbar, SaveButton, useCreate} from "react-admin";
import Button from '@mui/material/Button';
import React from "react";
import {SelectInput} from 'react-admin';
import {useNavigate} from "react-router-dom";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {useWatch} from "react-hook-form";
import {object} from "prop-types";
import { JsonField } from "react-admin-json-view";
import { json } from "stream/consumers";

const TransactionView = (props: any) => {
    const {setAssets,assetStruct, onClose} = props
    JSON.stringify(assetStruct)
    return (
        <Create {...props}>
            <SimpleForm toolbar={<StartTransactionToolBar setAssets={setAssets} onClose={onClose}/>}>
                <SelectInput source="function" choices={[
                            {id:"CreateAsset", name: "CreateAsset"},
                            {id:"UpdateAsset", name: "UpdateAsset"},
                            {id:"TransferAsset", name: "TransferAsset"}
                        ]}/>
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
    const {assets, setAssets,onClose} = props
    const [create, {isLoading, error}] = useCreate();
    const transactionData = {
        function: useWatch({name: 'function'}),
        asset_id: useWatch({name: 'asset_id'}),
        new_owner: useWatch({name: 'new_owner'}),
        new_address: useWatch({name: 'new_address'}),
        new_size: useWatch({name: 'new_size'}),
        new_salevalue: useWatch({name: 'new_salevalue'}),
        new_rentvalue: useWatch({name: 'new_rentvalue'}),
    }
    const handleClick = () => {
        var requestOptions: RequestInit = {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData),
        };
        let res = new Object();
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