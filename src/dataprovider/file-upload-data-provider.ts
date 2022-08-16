import {dataProvider} from "./data-provider";

const fileUploadDataProvider = {
    ...dataProvider,
    update: (resource: any, params: any) => {
        if (resource !== "smart-contracts") {
            return dataProvider.update(resource, params);
        }
    }
}