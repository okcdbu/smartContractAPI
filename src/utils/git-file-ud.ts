import {Octokit} from "octokit";

const CloneRepo = async (num: number) => {
    // const octokit = new Octokit({
    //     auth: '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',
    // });
    //
    const octokit = new Octokit();

    const {data} = await octokit.request('GET /repos/{owner}/{repo}/tarball/{ref}', {
        owner: 'arogyaGurkha',
        repo: 'GurkhaContracts',
        ref: 'master'
    });

    return data;
};

export default CloneRepo;