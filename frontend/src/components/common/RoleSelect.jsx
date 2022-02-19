import axios from 'axios';
import React, { useState } from 'react';
import { errorToast, successToast } from '../utility/common';

function RoleSelect({id, role, roles}) {
    const [roleVal ,setRoleVal] = useState(role);
    
    const changeRole = (val)=>{
        setRoleVal(val);
        axios.post('/user/assignRole', {
            id: id,
            role_id: val
          })
          .then(function (response) {
            if(response.data){
                successToast("Success" ,"Successfully updated the role")
            } else{
                errorToast("Oops", "Error in updating the user role");
            }
          })
          .catch(function (error) {
            errorToast("Oops", "Error contacting with server");
        });
    }

    return (
        <div className="ms-form-group has-icon">
        <select onChange={e => changeRole(e.target.value , id)} value={roleVal} className="form-contdol" name="permission_level">
            {
                roles.map(r=>
                    <option key={r.id} value={r.id} >{r.role}</option>
                )
            }
        </select>
    </div>
    );
}

export default RoleSelect;