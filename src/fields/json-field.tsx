import {useRecordContext} from "react-admin";
import ReactJson from "react-json-view";

const JsonField = ({source, name}: { source: any, name: string|null }) => {
    const record = useRecordContext();
    const currentElement = record[source];
    return(
        <ReactJson src={currentElement} name={name} displayDataTypes={false}/>
    )
};

export default JsonField;