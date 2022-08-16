import {useRecordContext} from 'react-admin';

const NameAuthorField = ({source}: { source: string }) => {
    const record = useRecordContext();
    return record ? (
        <>
            HEY
        </>
    ) : null;
}

export default NameAuthorField;