import React, { useEffect } from 'react';
import Breadcrumb from './Breadcrumb'
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { sweetAlertError, sweetAlertSuccess } from '../../utility/common';

const RoleAddEditContent = () => {
    const [openRoleModal ,setOpenRoleModal] = useState(false);
    const [rolesList ,setRolesList] = useState(null);
    const [roleName ,setRoleName] = useState("");
    const [permissionLevel ,setPermissionLevel] = useState(1);
    const [roleId ,setRoleId] = useState(null);

    const getRoles = async () =>{
        axios.get('/role')
        .then(function (response) {
            setRolesList(response.data);
        })
        .catch(function (error) {
            setRolesList([]);
            sweetAlertError("Oops","Error conncting with server");
        })
    }
    useEffect(()=>{
        getRoles();
    }, []);

    const deleteRole = (id)=>{
        axios.post('role/delete', {
            id: id,
          })
          .then( async (response) => {
            setOpenRoleModal(false);
            if(response.data.roleId){
                sweetAlertSuccess("Role deleted Successfully");
                await getRoles();
            } else if(response.data.message){
                sweetAlertError("Oops", "Error in deleting role, please try again");
            }
          })
          .catch(function (error) {
            sweetAlertError("Oops", "Error connecting with server, please try agian");
        });
    }

    const openAddEditRoleModal = (data)=>{
        console.log(data)
        if(data){
            setRoleName(data.role);
            setPermissionLevel(data.permission_level);
            setRoleId(data.id);
        } else{
            setRoleName("");
            setPermissionLevel(1);
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
            permission_level: permissionLevel
        }
        
        if(roleId){ //editcase
            data["id"] = roleId;
            endPOint = 'role/update';
            action = "Edit"
        } 
        axios.post(endPOint, data )
          .then(async (response)=> {
            setOpenRoleModal(false);
            if(response.data.roleId){
                sweetAlertSuccess(`Role ${action} Successfully`)
                await getRoles();
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
                                <h5 class="h5">Roles</h5>
                                <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="mr-3">
                                    {/* <button className="btn btn-success" onClick={openAddEditRoleModal}> Add New Role </button> */}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="ms-panel-body">
                            <div className="table-responsive">
                                <table className="table table-hover thead-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Permission Level</th>
                                            <th scope="col">Created At</th>
                                            <th scope="col">Updated At</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rolesList && rolesList.length > 0?
                                                rolesList.map((item, i) => (
                                                    <tr key={i}>
                                                        <th scope="row">{item.id}</th>
                                                        <td>{item.role}</td>
                                                        <td>{item.permission_level}</td>
                                                        <td>{item.created_at}</td>
                                                        <td>{item.updated_at}</td>
                                                        <td>
                                                            <Link onClick={()=>openAddEditRoleModal(item)} to="#"><i className="fas fa-pencil-alt text-success" /></Link>
                                                            <Link onClick={()=>deleteRole(item.id)} to="#"><i className="far fa-trash-alt ms-text-danger" /></Link>
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <></>
                                        }
                                    </tbody>
                                </table>
                                {
                                    !rolesList?
                                    <div className='d-flex justify-content-center'>Loading data...</div>
                                    :
                                    <></>
                                }
                                {
                                      rolesList && rolesList.length == 0?
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
                    <select onChange={e => setPermissionLevel(e.target.value)} value={permissionLevel} className="form-control" name="permission_level">
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

export default RoleAddEditContent;