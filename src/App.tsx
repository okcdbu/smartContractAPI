import React from 'react';
import {Admin, Resource} from 'react-admin';
import {SmartContractList} from "./views/main-list";
import {dataProvider} from "./dataprovider/data-provider";
import DetailsView from "./views/details-view";
import {SCUploadView} from "./views/smartcontract-upload-view";
import DiffView from "./views/test-dashboard";
import AdminView from "./views/admin-page";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const App = () => (
    <Admin dataProvider={dataProvider} dashboard={DiffView} >
        <Resource name="smart-contracts" list={SmartContractList} show={DetailsView} create={SCUploadView}/>
        <Resource name="admin-view"  list={AdminView} icon={ManageAccountsIcon}/>
    </Admin>
)
export default App;
