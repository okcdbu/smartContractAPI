import {
    ArrayField,
    ChipField,
    Datagrid,
    List,
    SingleFieldList,
    TextField,
    TextInput,
    SearchInput,
    WrapperField,
    BulkDeleteButton, useListContext
} from 'react-admin';
import RelativeTimeField from "../fields/custom-time-field";
import {Button} from '@mui/material'
import DifferenceIcon from '@mui/icons-material/Difference';
import React, {useState} from 'react';
import DiffDialogView from "./diff-dialog-view";
import DropdownMenu from "./dropdown-menu";

const postFilters = [
    // <SearchInput source="q" alwaysOn/>,
    <TextInput label="Title" source="title" defaultValue="Hello, World!"/>,
];

const DiffCheckButton = (props: any) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [currDiff, setCurrDiff] = useState(0)
    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);
    const changeCurrDiff = (val: number) => setCurrDiff(val);

    const {selectedIds, data} = useListContext();

    let selectedRecords = Object.values(data).filter(sc => selectedIds.includes(sc.id));

    let oldDiff = "", newDiff = "";

    if (selectedRecords.length === 2) {
        const sc1 = selectedRecords[0].cc_languages[0], sc2 = selectedRecords[1].cc_languages[0];
        if (currDiff === 0) {
            oldDiff = sc1.asset_struct;
            newDiff = sc2.asset_struct;
        } else if (currDiff === 1) {
            oldDiff = sc1.dependencies;
            newDiff = sc2.dependencies;
        }
    }

    const menuOptions = ['Asset Structure', 'Dependencies'];


    return (
        <div>
            <Button variant={"outlined"} startIcon={<DifferenceIcon/>} onClick={openDialog}>
                Differences
            </Button>
            <DiffDialogView open={dialogIsOpen}
                            onClose={closeDialog}
                            oldAsset={oldDiff}
                            newAsset={newDiff}
                            dropDown={
                                <DropdownMenu
                                    title={"Diff Options"}
                                    menuOptions={menuOptions}
                                    menuCallbackAction={changeCurrDiff}/>}
            />
        </div>
    );
};

const BulkActionButtons = (props: any) => (
    <React.Fragment>
        <DiffCheckButton {...props}/>
        <BulkDeleteButton {...props}/>
    </React.Fragment>
)


export const SmartContractList = (props: any) => {
    return (
        <List {...props} filters={postFilters} exporter={false} hasCreate={true}>
            <Datagrid rowClick="show" bulkActionButtons={<BulkActionButtons/>}>
                <WrapperField label="name_author">
                    <TextField source="name"/> <br/>
                    <TextField source="author"/>
                </WrapperField>
                <ArrayField source="cc_languages">
                    <SingleFieldList>
                        <ChipField source="language"/>
                    </SingleFieldList>
                </ArrayField>
                <TextField source="platform"/>
                <RelativeTimeField source="uploaded"/>
            </Datagrid>
        </List>
    );
}