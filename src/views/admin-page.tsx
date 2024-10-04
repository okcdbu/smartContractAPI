import React from 'react';
import {Button} from "@mui/material";

const AdminView = () => (
    <div>
        <Button variant={"contained"} onClick={addOrg} style={{width : "100%", marginBottom : "5px", marginTop : "10px"}}>AddOrg</Button>
    </div>
)

const addOrg= () => {
    fetch(`http://${window.location.origin}:8080/fabric/admin/addorg`)
        .then((response)=> response.json())
        .then((data)=>console.log(data))
        .catch(error => console.log('error',error))
}
export default AdminView;
