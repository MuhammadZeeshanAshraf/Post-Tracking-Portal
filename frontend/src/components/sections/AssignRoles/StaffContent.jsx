import React, { useEffect } from 'react';
import Breadcrumb from './Breadcrumb'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { sweetAlertError, sweetAlertSuccess } from '../../utility/common';
import Switch from '../../common/Switch';
import RoleSelect from '../../common/RoleSelect';

const StaffContent = () => {
    const [openRoleModal ,setOpenRoleModal] = useState(false);
    const [staffList ,setStaffList] = useState(null);
    const [roles ,setRoles] = useState([]);
    const [roleName ,setRoleName] = useState("");
    const [roleVal ,setRoleVal] = useState(1);
    const [roleId ,setRoleId] = useState(null);

    const getStaff  =  async ()=>{
        axios.get('/user')
        .then(function (response) {
            console.log(response)
            setStaffList(response.data);
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


    const openAddEditRoleModal = (data)=>{
        console.log(data)
        if(data){
            setRoleName(data.role);
            setRoleVal(data.permission_level);
            setRoleId(data.id);
        } else{
            setRoleName("");
            setRoleVal(1);
            setRoleId(null);
        }
        setOpenRoleModal(true);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        
        let endPOint = 'role/add';
        let action = "Add";

        let data = {
            role: roleName,
            permission_level: roleVal
          }
        
          if(roleId){ //editcase
            data["id"] = roleId;
            endPOint = 'role/update';
            action = "Edit"
        } 
        axios.post(endPOint, data )
          .then(function (response) {
            setOpenRoleModal(false);
            if(response.data.roleId){
                sweetAlertSuccess(`Role ${action} Successfully`)
            } else if(response.data.message){
                sweetAlertError("Oops", "Error in saving role, please try again");
            }
          })
          .catch(function (error) {
            sweetAlertError("Oops", "Error connecting with server, please try agian");
        });
    }

    return (
        <>
        <div className="ms-content-wrapper">
        <div className="row">
            <div className="col-md-12">
                <Breadcrumb />
                <div className="col-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                <h1 class="h2">Staff Page</h1>
                                <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="mr-3">
                                    <button className="btn btn-success" onClick={openAddEditRoleModal}> Add New Role </button>
                                </div>
                                    {/* <div class="btn-group mr-2">
                                        <button class="btn btn-danger" type="button"
                                                onclick="onPublishUnpublish('publish')">Publish
                                        </button>
                                        <button class="btn btn-danger" type="button"
                                                onclick="onPublishUnpublish('unpublish')">Unpublish
                                        </button>
                                    </div> */}
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
    <Modal className="modal-min" show={openRoleModal} onHide={()=>setOpenRoleModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="text-center">
            <button type="button" className="close" onClick={()=>setOpenRoleModal(false)}><span aria-hidden="true">×</span></button>
            <i className="flaticon-user d-block" />
            <h1> {roleId ? "Edit" : "Add" } Role</h1>
            <form id="formAddEditRole" onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={roleId} />
                <div className="ms-form-group has-icon">
                    <input  value={roleName} onChange={(e)=>setRoleName(e.target.value)} required type="text" placeholder="Role Name" className="form-control" name="role" />
                </div>
                <div className="ms-form-group has-icon">
                    <select onChange={e => setRoleVal(e.target.value)} value={roleVal} className="form-control" name="permission_level">
                        <option value="1">Permission Level 1</option>
                        <option value="2">Permission Level 2</option>
                        <option value="3">Permission Level 3</option>
                    </select>
                </div>
                <button type="submit"  className="btn btn-primary shadow-none">Save</button>
            </form>
        </Modal.Body>
    </Modal>
</>
    );
};

export default StaffContent;