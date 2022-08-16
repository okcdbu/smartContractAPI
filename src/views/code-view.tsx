import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {nord} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Octokit} from 'octokit';
import React from "react";
import {RestEndpointMethodTypes} from "@octokit/rest";

const getCodeFromGithub = async (source: any) => {
    const sourceForAPI = prepareURLForCode(source);

    const oKit = new Octokit();
    const {data} = await oKit.rest.repos.getContent({
        mediaType: {
            format: "raw",
        },
        owner: sourceForAPI.owner,
        repo: sourceForAPI.repo,
        path: sourceForAPI.path,
    });

    // https://github.com/arogyaGurkha/GurkhaContracts/blob/main/asset-transfer-basic/chaincode-go/chaincode/smartcontract.go

    type T = RestEndpointMethodTypes["repos"]["getContent"]["response"]["data"];
    const value = data as T;
    if (Array.isArray(value)) return [];
    return data.toString();
}

const prepareURLForCode = (source: any) => {
    const sourceURL = new URL(source.link);
    const pathNames = sourceURL.pathname.split('/');
    return {
        owner: pathNames[1],
        repo: pathNames[2],
        path: pathNames.slice(5,).join('/'),
    };
};

const CodeView = ({source}: { source: any }) => {
    const [code, setCode] = React.useState("");
    React.useEffect(() => {
        getCodeFromGithub(source).then(
            result => {
                setCode(result.toString())
            }
        );
    })

    return (
        <SyntaxHighlighter language={source.language} style={nord} showLineNumbers={true}>
            {code}
        </SyntaxHighlighter>
    );
}

export default CodeView;