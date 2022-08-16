import React from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import {Button} from "@mui/material";
const DiffView = ()=> {
    // const highlightSyntax = (str) => (
    //   <pre
    //     style={{ display: "inline" }}
    //     class="foo"
    //     dangerouslySetInnerHTML={{
    //       // __html: Prism.highlight(str, Prism.languages.javascript)
    //       __html: Prism.highlight(str, Prism.languages.json, "json")
    //       // __html: str
    //     }}
    //   />
    // );
    const oldData = {
        "fabric-contract-api": "^2.0.0",
        "fabric-shim": "^2.0.0",
        "json-stringify-deterministic": "^1.0.1",
        "sort-keys-recursive": "^2.1.2"
    }

    const newData = {
        "fabric-contract-api": "^2.1.0",
        "fabric-shim": "^2.0.3",
        "json-stringify-deterministic": "^1.0.3",
        "sort-keys-recursive": "^2.1.1",
        "react-diff-viewer": "^3.1.1"
    }

    const newStyles = {
        variables: {
            light: {
                codeFoldGutterBackground: "#6F767E",
                codeFoldBackground: "#E2E4E5"
            }
        }
    };
    return (
        <div className="App">
            <ReactDiffViewer
                oldValue={JSON.stringify(oldData, undefined, 4)}
                newValue={JSON.stringify(newData, undefined, 4)}
                splitView={true}
                compareMethod={DiffMethod.WORDS}
                styles={newStyles}
                leftTitle="Version A"
                rightTitle="Version B"
                // renderContent={highlightSyntax}
            />

        </div>
    );
};

export default DiffView;
