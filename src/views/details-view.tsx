import CodeView from "./code-view";
import {
    Show,
    SimpleShowLayout,
    TextField,
    WrapperField,
    ArrayField,
    ChipField,
    SingleFieldList,
    TextInput,
    Edit,
    SimpleForm,
    Datagrid, useShowController, getSimpleValidationResolver, SelectInput
} from 'react-admin'
import CustomTimeField from "../fields/custom-time-field";
import JsonField from "../fields/json-field";
import {Grid, Stack, Button, Divider,TableCell,TableRow,Checkbox} from '@mui/material'
import React, {useEffect,useState} from "react";
import FileSaver from "file-saver";
import DropdownMenu from "./dropdown-menu";
import TransactionDialogView from "./transaction-dialog-view";
import {json} from "stream/consumers";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DiffView from "./diff-view";
import DialogActions from "@mui/material/DialogActions";
import ReactJson from 'react-json-view'

const DetailsView = (props: any) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);
    const propsDialog = {open: dialogIsOpen,onClose : closeDialog };
    const {record} = useShowController();
    const [currCode, setCodeView] = useState(0);
    const [assets , setAssets] = useState([]);
    const [installed,setInstalled] = useState(false)
    useEffect(() => {
        fetchAssets().then((data) => {
            setAssets(data)
        })
    }, [dialogIsOpen])
    const changeCodeView = (val: number) => setCodeView(val);
    let codeViewMenu = []
    for (const language of record["cc_languages"]) {
        codeViewMenu.push(language.language);
    }

    /**
     * Dropdown here, select item here
     * Parse cc_languages here and send only the necessary link to <CodeView/>
     */
    return (
        <Show>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Stack spacing={1}>
                        <WrapperField>
                            <span style={{fontSize: 14}}>Uploaded <CustomTimeField source="uploaded"/> by <TextField
                                source="author" style={{fontSize: 14}}/></span>
                        </WrapperField>
                        <Stack direction="row"
                               justifyContent="space-between"
                               alignItems="center"
                               spacing={2}>
                            <TextField source="name" label={false} style={{fontSize: 30}}/>
                            <div>
                                <Button variant={"contained"} onClick ={() => openDialog()} style={{width : "100%", marginBottom : "5px"}}>Assets</Button>
                                <DropdownMenu
                                    title={"Programming Languages"}
                                    menuOptions={codeViewMenu}
                                    menuCallbackAction={changeCodeView}/>
                            </div>
                        </Stack>
                        {/* <AssetView
                            assets = {assets}
                            record ={record}
                            open={dialogIsOpen}
                                   onClose={closeDialog}/> */}
                        <CodeView source={record.cc_languages[currCode]}/>
                    </Stack>
                </Grid>
                <Grid item xs={6} md={4}>
                    <SimpleShowLayout>
                        <TextField source="description" label={"Chaincode Description"}/>
                        <TextField source="platform"/>
                        <TextField source="signature_policy"/>
                        <ArrayField source={"cc_languages"} >
                            {/*TODO: Write a custom component for this!!*/}
                            <Datagrid bulkActionButtons={false}>
                                <ChipField source="language"/>
                                <JsonField source="asset_struct" name={null}/>
                                <JsonField source="dependencies" name={null}/>
                            </Datagrid>
                        </ArrayField>
                        <ArrayField source="app_languages">
                            <SingleFieldList>
                                <ChipField source="language"/>
                            </SingleFieldList>
                        </ArrayField>
                        <ArrayField source="versions">
                            <SingleFieldList>
                                <ChipField source="version"/>
                            </SingleFieldList>
                        </ArrayField>
                        <Divider light/>
                        <TransactionDialogButton assets={assets} setAssets={setAssets} record = {record}></TransactionDialogButton>
                        <Button variant={"contained"} onClick={downloadSC} name={record.name}>Download Smart Contract</Button>
                        <Button variant={"contained"}
                                onClick={() => installSC(record)}>Install
                            Smart Contract</Button>
                        {/*<TransactionDialogButton/>*/}
                    </SimpleShowLayout>
                </Grid>
            </Grid>
        </Show>
    )
};

const AssetView = (props: any) => {
    const {assets,record,open, onClose} = props;
    
    return (
        <Show {...props}>
            <Dialog open={open} onClose={onClose} maxWidth={"md"}>
                <DialogTitle>Asset View</DialogTitle>
                <DialogContent>
                    <ArrayField source={"cc_languages"} >
                        {/*TODO: Write a custom component for this!!*/}
                        <Datagrid bulkActionButtons={false}>
                            <ChipField source="language"/>
                            <JsonField source="asset_struct" name={null}/> //asset id
                            <JsonField source="dependencies" name={null}/> //old owner
                        </Datagrid>
                    </ArrayField>
                    {assets.map((asset : any) => {
                        return  <ReactJson name={asset.ID} src={asset} displayDataTypes={false} enableClipboard={false} 
                        style={{margin: 10, border: "3px solid black", borderRadius: 10, padding:15}}/>
                    })}
                   {/* <JsonField source="assets" src={assets} name = {null}></JsonField> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Show>
    )
};
// const queryingChains = (props : any) => {
//     const assets = fetchAssets()
//     const {records} = props;
//     const [dialogIsOpen, setDialogIsOpen] = useState(false);
//     const openDialog = () => {setDialogIsOpen(true);}
//     const closeDialog = () => setDialogIsOpen(false);

//     const value = fetchAssets()

//     return (
//         <div>
//             <Button variant={"contained"} onClick={openDialog}>Use SC for Transaction</Button>
//             <TransactionDialogView 
//                 record = {record}
//                 open={dialogIsOpen}
//                 onClose={closeDialog}
//                 jsonSrc={jsonSrc}/>
//         </div>
//     )
// }

const downloadSC = (e : any) => {
    const name = e.target.getAttribute('name')
    console.log("Downloading Smart Contract.")
    // const myHeaders = new Headers();
    // const requestOptions: RequestInit = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    fetch(`http://localhost:8080/fabric/dashboard/downloadCC?name=${name}`,{method: 'GET'})
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name}.tar.gz`;
            document.body.appendChild(a);
            a.click();
            setTimeout((_ : any) => {
                window.URL.revokeObjectURL(url);
            }, 60000);
            a.remove();
        })
        .catch(error => console.log('error', error));
    // FileSaver.saveAs("https://cors-anywhere.herokuapp.com/api.github.com/repos/arogyaGurkha/GurkhaContracts/tarball/main", "CC.tar.gz")
};


const installSC = (source: any) => {
    console.log("Installing Smart Contract.")
    // TODO first save the smartcontract to server
    // Request needs
    /**
     * Name
     * Path
     * Language
     */

    console.log(source)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "cc_name": source["name"],
        "cc_path": source["name"] + "/chaincode-" + source["cc_languages"][0].language,
        "cc_language": source["cc_languages"][0].language
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/fabric/dashboard/deployCC", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};

const TransactionDialogButton = (props : any) => {
    const {record,assets,setAssets} = props;
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const openDialog = () => {setDialogIsOpen(true);}
    const closeDialog = () => setDialogIsOpen(false);

    return (
        <div>
            <Button variant={"contained"} onClick={openDialog}>Use SC for Transaction</Button>
            <TransactionDialogView 
                assets = {assets}
                setAssets = {setAssets}
                record = {record}
                open={dialogIsOpen}
                onClose={closeDialog}/>
        </div>
    )
};

const fetchAssets = async () => {
    var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
    };
    let res = new Object();
    let data = fetch("http://localhost:8080/fabric/dashboard/smart-contracts/asset", requestOptions)
        .then(response => response.json())
        .then(result =>{ 
            //console.log("result")
     
            return result
            })
        .catch(error => console.log('error11', error));
    return data
}

export default DetailsView;