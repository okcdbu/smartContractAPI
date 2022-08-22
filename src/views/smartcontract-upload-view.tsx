import {
    Create,
    SimpleForm,
    TextInput,
    ArrayInput,
    SaveButton,
    SimpleFormIterator,
    Toolbar,
    useNotify,
} from 'react-admin';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const SCUploadView = (props: any) => {
    const [value,setValue] = useState('')
    const handleChange = ({e}: { e: any }) => {
        e.target.value.replace(/[^0-9]/g, '')
        console.log(e.target.value)
        setValue(e.target.value)
    }
    return (
        <Create {...props}>
            <SimpleForm toolbar={<FileUploadToolbar/>}>
                <TextInput source="id" label={"ID"} onChange={(e) => handleChange({e: e})}/>
                <TextInput source="name" label="Smart Contract Name" />
                <TextInput source="uploaded" style={{display:"none"}}/>
                <TextInput source={"author"} label={"Author"}/>
                <TextInput source={"description"} label={"Description"}/>
                <TextInput source={"platform"} label={"Platform"}/>
                <TextInput source={"signature_policy"} label={"Signature Policy"}/>
                <ArrayInput source={"cc_languages"} name={"CC Languages"}>
                    <SimpleFormIterator>
                        <TextInput source={"language"} label={"Language"}/>
                        <TextInput source={"link"} label={"Main Source Link"}/>
                        <TextInput source={"asset_struct.ID"}/>
                        <TextInput source={"asset_struct.Color"}/>
                        <TextInput source={"asset_struct.Size"}/>
                        <TextInput multiline={true} fullWidth={true} source={"dependencies.fabric-contract-api"}/>
                        <TextInput multiline={true} fullWidth={true} source={"dependencies.fabric-shim"}/>
                        <TextInput multiline={true} fullWidth={true} source={"dependencies.json-stringify-deterministic"}/>
                        <TextInput multiline={true} fullWidth={true} source={"dependencies.sort-keys-recursive"}/>
                        {/*<TextInput multiline={true} fullWidth={true} source={"dependencies"}/>*/}
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput name={"App Languages"} source={"app_languages"}>
                    <SimpleFormIterator>
                        <TextInput source={"language"} label={"Language"}/>
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput name={"Versions"} source={"versions"}>
                    <SimpleFormIterator>
                        <TextInput source={"version"} label={"Version"}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};

const FileUploadToolbar = () => {
    const notify = useNotify();
    const navigate = useNavigate();
    return (
        <Toolbar>
            <SaveButton
                label="Save and add"
                mutationOptions={{
                    onSuccess: () => {
                        notify('Element created');
                        navigate('/smart-contracts')
                    }
                }
                }
                type="button"
                variant="text"
            />

        </Toolbar>
    )
}

