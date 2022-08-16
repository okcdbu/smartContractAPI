import {DateTime} from 'luxon';
import {useRecordContext} from 'react-admin';


const RelativeTimeField = ({source}: { source: string }) => {
    const record = useRecordContext();

    return record ? (
        <span>
            {DateTime.fromISO(record[source]).toRelativeCalendar()}
        </span>
    ) : null;
}

export default RelativeTimeField;