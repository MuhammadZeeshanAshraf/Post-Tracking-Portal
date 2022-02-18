import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import RoleSelect from '../../common/RoleSelect';
import { sweetAlertError, sweetAlertSuccess } from '../../utility/common';
import Breadcrumb from './Breadcrumb';
import '../../../assets/css/uploadFile.css';
import uploadIcon from '../../../assets/img/uplaod_file.png';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { Tab, Nav } from "react-bootstrap";
import $ from 'jquery';

const generateDefaultEditorRow = (rows)=>{
    let list = [];
    for(let i = 0; i < rows; i++){
        let data  = {
            trackId:"",
            number:"",
            id: i+"",
        }
        list = [...list, data]; 
    }
    return list;
}

const UploadContent = () => {
    const [openRoleModal ,setOpenRoleModal] = useState(false);
    const [staffList ,setStaffList] = useState(null);
    const [roles ,setRoles] = useState([]);
    const [roleName ,setRoleName] = useState("");
    const [roleVal ,setRoleVal] = useState(1);
    const [roleId ,setRoleId] = useState(null);
    const [fileName, setFileName] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [editorData, setEditorData] = React.useState(generateDefaultEditorRow(10))
    const [fileOutlook, setFileOutlook] = React.useState(null);
    const [fileProcess, setFileProcess] = React.useState(false);
    const [focusLast, setFocusLast] = React.useState(false);
    const [nextFocus, setNextFocus] = React.useState(null);

        
    const handleEditorInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...editorData];
        list[index][name] = value;
        setEditorData(list);
    };

    const handlePastEvent = (e)=>{
        const data =  e.clipboardData.getData("text");
        if(data.length >0 && data !== "text"){
            const rows = data.split("\n");
            let newEditorRows = [...editorData];
            rows.map(row => {
                console.log(row)
                const rowData = row.trim().split(/[ ,]+/);
                let trackId = "";
                let number = "";
                try{
                    trackId = rowData[0];
                    number = rowData[1];
                }catch(err){
                    console.log(err);
                }
                newEditorRows = [...newEditorRows, { trackId: trackId, number: number, id : newEditorRows.length + 1}];
            })
            setEditorData(newEditorRows);
        }
    }
    
    const copyFromClipboard = (e, index) =>{
        const event = new Event('onPast');
        e.target.dispatchEvent(event);
    }   

    const addEditorRow = (index) =>{
        const tempList = [...editorData];
        tempList.splice(index+1, 0 , {trackId: "", number: "" , id :index});
        setEditorData(tempList);
    }   

    const handleEdiotrKeyPress = (e, index) => {
        if(e.key === 'Enter'){
          console.log('enter press here! ')
          let i =  parseInt(index)+1;
          const nextSibling =  document.getElementById("editRow_"+i);
          // If found, focus the next field
          if (nextSibling !== null) {
            nextSibling.focus();
          } else{
            setFocusLast(true);
            addEditorRow(index);
          }
        } else{
            const { name, value } = e.target;
            const list = [...editorData];
            list[index][name] = value;
            setEditorData(list);
        }
    } 

    const deleteEditorRow = (index) =>{
        const tempList = [...editorData];
        tempList.splice(index, 1);
        setEditorData(tempList);
    }   

    const onFileDrop = (uploadFile) => {
        setFileName(uploadFile[0].name);
        setFile(uploadFile);
      };
    const processFile  =  async ()=>{
        setFileProcess(true);
    }
    
    const uplopadFile  =  async ()=>{
        setFileOutlook({totalTrackingIds:10, duplicateTackingIds: 5, emtyTrackingIds:3 });

        // if (file) {
        //     const data = new FormData();
        //     data.append("TrackingWorkSheet", file[0]);
        //     data.append("key", fileName);
        //     axios
        //     .post("import-process", data)
        //     .then(resp => {
        //         console.log(resp);

        //     }).catch(ex=>{
        //         console.log(ex);
        //     });
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
            await getRoles();
         }
       
         fetchData();
    }, []);

    useEffect(()=>{
        if(focusLast){
            const i = editorData.length-1;
            const lastInput =  document.getElementById("editRow_"+i);
            lastInput.focus();    
            setFocusLast(false);
        } else if(nextFocus){
            console.log(nextFocus);
            const nextInput =  document.getElementById("editRow_"+nextFocus);
            nextInput.focus();    
            setNextFocus(null);
        }
    }, [editorData]);

    
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
    const ProgressBar = (progress)=>{
        return(
        <div className="col-md-6">
            <div className="progress-rounded">
                <div className="progress-value">{progress}%</div>
                <svg>
                    <circle className="progress-cicle bg-info" cx={65} cy={65} r={57} strokeWidth={16} fill="none" aria-valuenow="38.8" aria-orientation="vertical" aria-valuemin={0} aria-valuemax={100} role="slider">
                    </circle>
                </svg>
            </div>
        </div>
        );
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
                                    <h1 class="h2">Process Trackings</h1>
                                    <div class="btn-toolbar mb-2 mb-md-0">
                                    <div class="mr-3">
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
                            <div className="ms-panel-body ">
                            {
                                fileOutlook?
                                <div className="d-flex flex-column justify-content-center">
                                     <div className='d-flex justify-content-center align-items-center'>
                                        <h5>File Name : {fileName}</h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-6 col-md-6">
                                            <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                                {/* <span className="ms-chart-label bg-black"><i className="material-icons">arrow_upward</i> 3.2%</span> */}
                                                <div className="ms-card-body media">
                                                    <div className="media-body">
                                                        <span className="black-text"><strong>Total Tracking Ids</strong></span>
                                                        <h2>{fileOutlook.totalTrackingIds}</h2>
                                                    </div>
                                                </div>
                                                {/* <LineChart data={this.state.data1} options={options} /> */}
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-6">
                                            <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                                {/* <span className="ms-chart-label bg-red"><i className="material-icons">arrow_downward</i> 4.5%</span> */}
                                                <div className="ms-card-body media">
                                                    <div className="media-body">
                                                        <span className="black-text"><strong>Dubplicate Tracking Ids</strong></span>
                                                        <h2>{fileOutlook.duplicateTackingIds}</h2>
                                                    </div>
                                                </div>
                                                {/* <LineChart data={this.state.data2} options={options} /> */}
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-6">
                                            <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                                {/* <span className="ms-chart-label bg-red"><i className="material-icons">arrow_downward</i> 4.5%</span> */}
                                                <div className="ms-card-body media">
                                                    <div className="media-body">
                                                        <span className="black-text"><strong>Emty Tracking Ids</strong></span>
                                                        <h2>{fileOutlook.emtyTrackingIds}</h2>
                                                    </div>
                                                </div>
                                                {/* <LineChart data={this.state.data2} options={options} /> */}
                                            </div>
                                        </div>
                                    </div>
                                <div>
                                    <button type="button" onClick={()=>{setFileOutlook(null);setFileProcess(true);}}  className="m-5 btn btn-success has-icon"><i className="flaticon-start" />Process Files</button>
                                    <button type="button" onClick={()=>{setFileOutlook(false); setFileName("");setFile(null);}}  className="m-5 btn btn-outline-secondary has-icon"><i className="flaticon-start" />New Files</button>
                                </div>
                            </div>  
                            :
                            <Tab.Container defaultActiveKey="tab13">
                                    <Nav variant="tabs" className="nav nav-tabs d-flex nav-justified mb-4">
                                        <Nav.Item>
                                            <Nav.Link eventKey="tab13">Upload File</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="tab14">Manual Editor</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="tab13">
                                            {
                                                fileName && fileName.length > 0?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <h5>File Name : {fileName}</h5>
                                                    <button type="button" onClick={uplopadFile}  className="m-5 btn btn-success has-icon"><i className="flaticon-start" />Process Files</button>
                                                </div>
                                                :
                                                <></>
                                            }
                                            <Dropzone onDrop={acceptedFiles => onFileDrop(acceptedFiles)}>
                                                {({getRootProps, getInputProps}) => (
                                                    <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                                            <div className="uploadfileMain d-flex flex-column justify-content-center align-items-center">
                                                                <img className='mb-2 uploadImage'  src={uploadIcon} alt="member" />
                                                                <h3 className='mb-2 '>Drag&Drop files here</h3>
                                                                <h5 className='mb-2'>Or</h5>
                                                                <button type="button"  className="btn btn-outline-info">Brows Files</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </section>
                                                )}
                                            </Dropzone>    
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="tab14">
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <button type="button" onClick={uplopadFile}  className="m-5 btn btn-success has-icon"><i className="flaticon-start" />Upload</button>
                                        </div>
                                        <div className='d-flex flex-direction-column justify-content-center'>
                                            <div></div>
                                            <div className="editor">
                                            <div className="d-flex editorHeader mb-2" onPaste={e=>handlePastEvent(e)}>
                                                <h5 className='mr-2 text-secondary'>Track ID</h5>
                                                <h5 className='mr-2 text-secondary'>Number</h5>
                                            </div>
                                                {
                                                    editorData.map((row, index)=>{ 
                                                        let  id = "editRow_"+index;
                                                        return(
                                                            <div className="d-flex editorRowDiv" onPaste={e=>handlePastEvent(e)}>
                                                                <strong className='mr-2 text-secondary'>{index+1})</strong>
                                                                <input 
                                                                    onPaste={e=>e.preventDefault()}
                                                                    className="form-control editorInput" 
                                                                    name="trackId" 
                                                                    id={id}
                                                                    type="text"  
                                                                    onKeyPress={e=> handleEdiotrKeyPress(e,index)}
                                                                    onChange={e => handleEditorInputChange(e, index)} 
                                                                    value={row.trackId}  />
                                                                <input
                                                                    className="form-control editorInput"
                                                                    name="number"
                                                                    type="text"
                                                                    onChange={e => handleEditorInputChange(e, index)} value={row.number}
                                                                    onPaste={e=>e.preventDefault()}
                                                                />
                                                                <Link title="Add new" onClick={()=>{setNextFocus(index+1); addEditorRow(index);}} to="#"><i class="fas fa-plus-circle ml-2 mr-2 fs-16 text-success"/></Link>
                                                                {/* <Link onPaste={(e)=>handlePastEvent(e)} title="Copy from clipboard" onClick={(e)=>copyFromClipboard(e ,index)} to="#"><i class="fas  fa-clipboard mr-2 fs-16 text-secondary"/></Link> */}
                                                                <Link title="Delte" onClick={()=>deleteEditorRow(index)} to="#"><i className="material-icons fs-18 mr-2 text-danger">delete</i></Link> 
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>           
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>    
                            }
                            {
                                fileProcess?
                                    <>
                                    <ProgressBar progress={10}/>
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
                                    </>
                                    :
                                <></> 
                            }
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

export default UploadContent;