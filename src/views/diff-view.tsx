import ReactDiffViewer, {DiffMethod} from 'react-diff-viewer'

const DiffView = (props: any) => {

    const {oldValue, newValue} = props;

    const newStyles = {
        variables: {
            light: {
                codeFoldGutterBackground: "#6F767E",
                codeFoldBackground: "#E2E4E5"
            }
        }
    }
    return (
        <div className="App">
            <ReactDiffViewer
                oldValue={JSON.stringify(oldValue, undefined, 4)}
                newValue={JSON.stringify(newValue, undefined, 4)}
                splitView={true}
                compareMethod={DiffMethod.WORDS}
                styles={newStyles}
                leftTitle="Version A"
                rightTitle="Version B"
            />
        </div>
    )
};

export default DiffView;
