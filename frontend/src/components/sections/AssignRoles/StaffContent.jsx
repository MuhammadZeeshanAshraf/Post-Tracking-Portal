import React, { useEffect } from 'react';
import Breadcrumb from './Breadcrumb'
import { useState } from 'react';
import axios from 'axios';
import { sweetAlertError } from '../../utility/common';
import Switch from '../../common/Switch';
import RoleSelect from '../../common/RoleSelect';

const StaffContent = () => {
    const [staffList ,setStaffList] = useState(null);
    const [roles ,setRoles] = useState([]);

    const getStaff  =  async ()=>{
        axios.get('/user')
        .then(function (response) {
            console.log(response)
            setStaffList(response.data.data);
        })
        .catch(function (error) {
            // handle error
            setStaffList([]);
            sweetAlertError("Oops","Error conncting with server");
        })
    }
    
    const getRoles = () =>{
        axios.get('/role')
        .then(function (response) {
            console.log(response);
            setRoles(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log("Error in getting roles data");
        })
    }
    
    useEffect(()=>{
        const fetchData = async () => {
            await getStaff();
            await getRoles();
         }
       
         fetchData();
    }, []);

    return (
        <div className="ms-content-wrapper">
        <div className="row">
            <div className="col-md-12">
                <Breadcrumb />
                <div className="col-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <h5 class="h5">Staff Page</h5>
                                <div class="btn-toolbar mb-2 mb-md-0">
                                </div>
                            </div>
                        </div>
                        <div className="ms-panel-body">
                            <div className="table-responsive">
                                <table className="table table-hover thead-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Active</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Primary Number</th>
                                            <th scope="col">Alternative Number</th>
                                            <th scope="col">Date of Birth</th>
                                            <th scope="col">Father Name</th>
                                            <th scope="col">Mother Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            staffList && staffList.length > 0?
                                                staffList.map((item, i) => (
                                                    <tr key={i}>
                                                        <th scope="row">{item.name}</th>
                                                        <td>
                                                        <Switch
                                                            isOn={item.active}
                                                            id={item.id}
                                                            onColor="#fff"
                                                        />
                                                        </td>
                                                        <td>
                                                            <RoleSelect id={item.id} role={item.role_id} roles={roles} />
                                                        </td>
                                                        <td>{item.email}</td>
                                                        <td>{item.primary_phone}</td>
                                                        <td>{item.alternative_number}</td>
                                                        <td>{item.dob}</td>
                                                        <td>{item.father_name}</td>
                                                        <td>{item.mother_name}</td>
                                                    </tr>
                                                ))
                                                :
                                                <></>
                                        }
                                    </tbody>
                                </table>
                                {
                                    !staffList?
                                    <div className='d-flex justify-content-center'>Loading data...</div>
                                    :
                                    <></>
                                }
                                {
                                      staffList && staffList.length == 0?
                                      <div className='d-flex justify-content-center'>No record found</div>
                                      :
                                      <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default StaffContent;