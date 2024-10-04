import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('http://path.to.my.api/');

create: (resource : any, params : any) : any => {
    if (resource !== 'smart-contracts') {
        // fallback to the default implementation
        return dataProvider.create(resource, params);
    }
    // else {
    //     return uploadfile(resource,params,dataProvider.create)
    // }
    // const newFiles = params.data.chaincodes.filter(
    //     (p : any) => p.rawFile instanceof File
    // );
    // const formerFiles = params.data.chaincodes.filter(
    //     (p : any) => !(p.rawFile instanceof File)
    // );
    // return Promise.all(newFiles.map(convertFileToBase64))
    //     .then(base64Pictures =>
    //         base64Pictures.map(picture64 => ({
    //             src: picture64,
    //             title: `${params.data.title}`,
    //         }))
    //     )
    //     .then(transformedNewFiles =>
    //         dataProvider.create(resource, {
    //             data: {
    //                 ...params.data,
    //                 files: [
    //                     ...transformedNewFiles,
    //                     ...formerFiles,
    //                 ],
    //             }
    //         })
    //     );
}
function uploadFileAndSave(resource : any, params : any, func : any) {
    if (params.data.hasOwnProperty('file') === false) {
        return func(resource, params);
    }

    let file = params.data.chaincodes
    delete params.data.chaincodes

    if (file == null) {
        return func(resource, params)
    }

    console.log(params.data)
    console.log("file:", file)

    return func(resource, params).then((result : any) => {
        let formData = new FormData();
        formData.append("file", file.rawFile)

        return fetch(`http://${window.location.hostname}:8080/fabric/dashboard/` + resource , {
            method: 'POST',
            body: formData
        }).then(() => result)
    })
}
const convertFileToBase64 = (file : any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });
// export default fileProvider;

// const fileUploadDataProvider = {
//     ...dataProvider,
//     update: (resource: any, params: any) => {
//         if (resource !== "smart-contracts") {
//             return dataProvider.update(resource, params);
//         }
//         // Freshly dropped pictures are File objects and must be converted to base64 strings
//         const newPictures = params.data.pictures.filter(
//             (p : any) => p.rawFile instanceof File
//         );
//         const formerPictures = params.data.pictures.filter(
//             (p : any) => !(p.rawFile instanceof File)
//         );

//         return Promise.all(newPictures.map(convertFileToBase64))
//             .then(base64Pictures =>
//                 base64Pictures.map(picture64 => ({
//                     src: picture64,
//                     title: `${params.data.title}`,
//                 }))
//             )
//             .then(transformedNewPictures =>
//                 dataProvider.update(resource, {
//                     data: {
//                         ...params.data,
//                         files: [
//                             ...transformedNewPictures,
//                             ...formerPictures,
//                         ],
//                     },
//                 })
//             );
//     },
// }
