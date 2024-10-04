import {fetchUtils,HttpError} from 'react-admin';
import {stringify} from 'query-string';
import { isTemplateExpression } from 'typescript';
import { blob } from 'stream/consumers';

const apiUrl = 'http://${window.location.origin}:8080/fabric/dashboard';
const httpClient = fetchUtils.fetchJson;

// @ts-ignore
export const dataProvider = {
    getList: (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => ({
            data: json,
            total: parseInt(headers.get('content-range')?.split('/').pop()!, 10),
        }));
    },

    getOne: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json}) => ({
            data: json,
        })),

    getMany: (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({ids: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({json}) => ({data: json}));
    },

    getManyReference: (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => ({
            data: json,
            total: parseInt(headers.get('content-range')?.split('/').pop()!, 10),
        }));
    },

    // create: (resource: any, params: any) =>
    //     httpClient(`${apiUrl}/${resource}`, {
    //         method: 'POST',
    //         body: JSON.stringify(params.data),
    //     }).then(({json}) => ({
    //         data: {...params.data, id: String(json.id)},
    //     })),
    create: (resource : any, params : any) : any => {
        if (resource !== 'smart-contracts') {
            httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({json}) => ({
                data: {...params.data, id: String(json.id)},
            }))
        }
        else {
            let file = params.data.chaincodes
            delete params.data.chaincodes
            
            // no package file
            if (file == null) {
                console.log("file is null")
                var ans = httpClient(`${apiUrl}/${resource}`, {
                    method: 'POST',
                    body: JSON.stringify(params.data),
                }).then(({json}) => ({
                    data: {...params.data, id: String(json.id)},
                }))
                return ans
            }
            // exist package file
            else {
                console.log(params.data)
                console.log("file:", file)
                console.log("rawfile: ", file.rawFile)
                
            
                let formData = new FormData();
                formData.append('file',file.rawFile)
                formData.append('data',JSON.stringify(params.data))
                var ans = httpClient(`${apiUrl}/${resource}/file`, {
                    method: 'POST',
                    body:formData,
                }).then(({json}) => ({
                    data: {...params.data, id: String(json.id)},
                }))
                return ans
            }
        }
       
    },
    update: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json})),

    updateMany: (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json}));
    },

    delete: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({json}) => ({data: json})),

    deleteMany: (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json}));
    },
    installCC: (resource: any, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json})),
};
