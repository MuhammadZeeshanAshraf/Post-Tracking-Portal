import React from 'react';
import Breadcrumb from './Breadcrumb'
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { sweetAlertError, sweetAlertSuccess } from '../../utility/common';

const Content = () => {
    const [openRoleModal ,setOpenRoleModal] = useState(false);
    const [password ,setPassword] = useState("");


    const openAddEditRoleModal = ()=>{
        setPassword("");
        setOpenRoleModal(true);
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        let endPOint = 'delete';
        let data = {
            date_time:document.getElementById("toDate").value.replace('T'," ")+":00"
          }
    
        axios.delete(endPOint, data )
          .then(function (response) {
            setOpenRoleModal(false);
            if(response.data.roleId){
                sweetAlertSuccess(`Cleared Successfully`)
            } else if(response.data.message){
                sweetAlertError("Oops", "Error in clearing storage, please try again");
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
                                    <h1 class="h2">Clear Storage</h1>
                                    <div class="btn-toolbar mb-2 mb-md-0">
                                        <div class="mr-3">
                                            <button className="btn btn-success" onClick={openAddEditRoleModal}> Clear </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ms-panel-body">
                                <form>
                                    <p><span className="text-danger">Note:      </span>Please enter date uptill you want to clear storage</p>
                                    <div className="form-row">
                                        <div className="col-md-12 ">
                                            <label>To Date</label>
                                            <div className="input-group">
                                                <input 
                                                type="datetime-local"
                                                id="toDate"
                                                className={"form-control"} 
                                                placeholder="Date"
                                                name="date"
                                                required />
                                            </div>
                                        </div>
                                    </div>
                                </form>
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
                <h1> Password Authentication </h1>
                <form id="formAddEditRole" onSubmit={handleSubmit}>
                    <div className="ms-form-group has-icon">
                        <input  value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" placeholder="Enter Password" className="form-control" name="password" />
                    </div>
                    <button type="submit"  className="btn btn-primary shadow-none">Confirm</button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default Content;