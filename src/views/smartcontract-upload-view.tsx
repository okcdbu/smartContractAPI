import {
    Create,
    SimpleForm,
    NumberInput,
    ArrayInput,
    SaveButton,
    SimpleFormIterator,
    Toolbar,
    useNotify,
    TextInput,
    FileInput,
    FileField, required,
} from 'react-admin';
import React, {createRef, useCallback, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {JsonInput} from "react-admin-json-view";
import {Button} from "@mui/material";
import {useDropzone} from "react-dropzone";
import Dropzone from "react-dropzone";


export const SCUploadView = (props: any) => {
    const [fileNames, setFileNames] = useState([]);
    const handleDrop = (acceptedFiles : any) =>
        setFileNames(acceptedFiles.map((file:any) => file.name));

    return (
        <Create {...props}>
            <SimpleForm toolbar={<FileUploadToolbar/>}>
                <TextInput source="id" label={"ID"} />
                <TextInput source="name" label="Smart Contract Name" validate={[required()]} />
                <TextInput source="uploaded" style={{display:"none"}}/>
                <TextInput source={"author"} label={"Author"}/>
                <TextInput source={"description"} label={"Description"}/>
                <TextInput source={"platform"} label={"Platform"}/>
                <TextInput source={"signature_policy"} label={"Signature Policy"}/>
                <ArrayInput source={"cc_languages"} name={"CC Languages"}>
                    <SimpleFormIterator>
                        <TextInput source={"language"} label={"Language"}/>
                        <TextInput source={"link"} label={"Main Source Link"}/>
                        <JsonInput
                            source="asset_struct"
                            label={"asset_struct"}
                            jsonString={false} // Set to true if the value is a string, default: false
                            reactJsonOptions={{
                                // Props passed to react-json-view
                                name: null,
                                collapsed: true,
                                enableClipboard: true,
                                displayDataTypes: true,
                            }}
                        />
                        <JsonInput
                            source="dependencies"
                            jsonString={false} // Set to true if the value is a string, default: false
                            reactJsonOptions={{
                                // Props passed to react-json-view
                                name: null,
                                collapsed: true,
                                enableClipboard: true,
                                displayDataTypes: true,
                            }}
                        />
                    </SimpleFormIterator>
                </ArrayInput>
                <FileInput source="chaincodes" label="chaincodes" accept="application/gzip, .gz">
                    <FileField source="src" title="title" />            
                </FileInput>
                

                <div>
                    <strong>Files:</strong>
                    <ul>
                        {fileNames.map(fileName => (
                            <li key={fileName}>{fileName}</li>
                        ))}
                    </ul>
                </div>
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
