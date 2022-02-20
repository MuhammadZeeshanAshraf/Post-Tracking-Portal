import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import RoleSelect from '../../common/RoleSelect';
import { sweetAlertError, sweetAlertSuccess, errorToast, successToast } from '../../utility/common';
import Breadcrumb from './Breadcrumb';
import CircleProgress from './CircleProgress';
import '../../../assets/css/uploadFile.css';
import uploadIcon from '../../../assets/img/uplaod_file.png';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { Tab, Nav } from "react-bootstrap";

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
    const [editorData, setEditorData] = React.useState(generateDefaultEditorRow(5))
    const [fileOutlook, setFileOutlook] = React.useState(null);
    const [fileIsProcessing, setFileIsProcessing] = React.useState(false);
    const [focusLast, setFocusLast] = React.useState(false);
    const [nextFocus, setNextFocus] = React.useState(null);
    const [processedRows, setProcessedRows] = React.useState([]);
        
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
    
    const uplopadFile  =  async (isEditor)=>{
        var data = null;
        var list  = []
        if(isEditor){
            editorData.map(row=>{
                if(row.trackId && row.trackId.length >0){
                    list.push({TrackingID: row.trackId, ContactNumber: row.number});
                }
            })
            data = list;
        } else if(file)
        if (file) {
            data = new FormData();
            data.append("TrackingWorkSheet", file[0]);
            data.append("Name", fileName);
        }
        if(data && data !== null){
            console.log(data)
            axios
            .post("import-process/validation", data)
            .then(resp => {
                console.log(resp)
                if(resp.status === 200){
                    successToast("Sucessfyully Validated", "File is validated successfully")
                    setFileOutlook(resp.data);
                }
            }).catch(ex=>{
                errorToast("Error", "Error occured while fetching data, please try again");
                console.log(ex);
            });
        }
    }

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

    const processFile = async () => {
          setFileIsProcessing(true);
          if (file) {
            const data = new FormData();
            data.append("TrackingWorkSheet", file[0]);
            data.append("Name", fileName);
            data.append("UserId", "1");
            data.append("UserName", "Usman");
            axios
              .post(
                "import-process",
                data,
                {}
              )
              .then((res) => {
                clearInterval(interval);
                axios
                  .get(
                    "import-process/data",
                    {}
                  )
                  .then((res) => {
                    successToast("Process Initiated", "File is processing successfully")
                    console.log(res.data);
                     if (Array.isArray(res.data.trackingData)) {
                    if (res.data.trackingData.length > 0) {
                        setProcessedRows(res.data.trackingData)
                    }
                  }
                  });
              });
            const interval = setInterval(() => {
              axios
                .get(
                  "import-process/data",
                  {}
                )
                .then((res) => {
                     if (Array.isArray(res.data.trackingData)) {
                    if (res.data.trackingData.length > 0) {
                        setProcessedRows(res.data.trackingData)
                    }
                  }
                });
            }, 20000);
          }
    }
    
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

    return (
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
                                fileIsProcessing?
                                <div className="d-flex justify-content-center flex-column align-items-center mt-5">
                                <CircleProgress progress={parseInt((processedRows.length/ parseInt(fileOutlook.total))*100)} />
                                    {/* <div className="col-md-6">
                                        <div className="progress-rounded">
                                            <div className="progress-value">{parseInt((processedRows.length/ parseInt(fileOutlook.total))*100)}%</div>
                                            <svg>
                                                <circle className="progress-cicle bg-info" cx={65} cy={65} r={57} strokeWidth={16} fill="none" aria-valuenow={parseInt((processedRows.length/ parseInt(fileOutlook.total))*100)} aria-orientation="vertical" aria-valuemin={0} aria-valuemax={100} role="slider">
                                                </circle>
                                            </svg>
                                        </div>
                                    </div> */}
                                        <div className="table-responsive">
                                        <table className="table table-hover thead-primary">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tracking Id</th>
                                                    <th scope="col">Artical Type</th>
                                                    <th scope="col">Booked At</th>
                                                    <th scope="col">Date of Booking</th>
                                                    <th scope="col">Contact Number</th>
                                                    <th scope="col">Customer PIN Code</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Validate (Validation Check)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    processedRows && processedRows.length > 0?
                                                        processedRows.map((item, i) => (
                                                            <tr key={i}>
                                                                <td>{item.tracking_id}</td>
                                                                <td>{item.type}</td>
                                                                <td>{item.booked_at}</td>
                                                                <td>{item.booking_date}</td>
                                                                <td>{item.contact_number}</td>
                                                                <td>{item.customer_pin_code}</td>
                                                                <td>{item.amount}</td>
                                                                <td>{item.book_status}</td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <></>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <div className="d-flex flex-column justify-content-center">
                                    <div className='d-flex align-items-center justify-content-center mt-3 mb-5'>
                                        <h4 className="h5 text-secondary">Selected File <i  className="fa fa-arrow-circle-right text-info" />&nbsp;&nbsp;&nbsp;{fileName}</h4>
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-xl-3 col-lg-6 col-md-6">
                                            <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                                {/* <span className="ms-chart-label bg-black"><i className="material-icons">arrow_upward</i> 3.2%</span> */}
                                                <div className="ms-card-body media">
                                                    <div className="media-body d-flex flex-column align-items-center justify-content-center">
                                                        <span className="black-text text-primary"><strong>Total Trackings</strong></span>
                                                        <h2 className='text-secondary'>{fileOutlook.total}</h2>
                                                    </div>
                                                </div>
                                                {/* <LineChart data={this.state.data1} options={options} /> */}
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-6">
                                            <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                                {/* <span className="ms-chart-label bg-red"><i className="material-icons">arrow_downward</i> 4.5%</span> */}
                                                <div className="ms-card-body media">
                                                    <div className="media-body d-flex flex-column align-items-center justify-content-center">
                                                        <span className="black-text text-primary"><strong>Dubplicate Trackings</strong></span>
                                                        <h2 className='text-secondary'>{fileOutlook.duplicatesCount}</h2>
                                                    </div>
                                                </div>
                                                {/* <LineChart data={this.state.data2} options={options} /> */}
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-6">
                                            <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                                                {/* <span className="ms-chart-label bg-red"><i className="material-icons">arrow_downward</i> 4.5%</span> */}
                                                <div className="ms-card-body media">
                                                    <div className="media-body d-flex flex-column align-items-center justify-content-center">
                                                        <span className="black-text text-primary"><strong>Unique Trackings</strong></span>
                                                        <h2 className='text-secondary'>{fileOutlook.uinque}</h2>
                                                    </div>
                                                </div>
                                                {/* <LineChart data={this.state.data2} options={options} /> */}
                                            </div>
                                        </div>
                                    </div>
                                        <div className='d-flex mt-5 justify-content-center'>
                                            <button type="button" onClick={processFile}  className="m-2 btn btn-success has-icon"><i className="flaticon-start" />Process File</button>
                                            <button type="button" onClick={()=>{setFileOutlook(false); setFileName("");setFile(null);}}  className="m-2 btn btn-outline-secondary has-icon">Upload New</button>
                                        </div>
                                </div>
                            :
                            <Tab.Container defaultActiveKey="tab13">
                                    <Nav variant="tabs" className="nav nav-tabs d-flex nav-justified mb-4">
                                        <Nav.Item>
                                            <Nav.Link eventKey="tab13">Upload File</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="tab14">Editor</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="tab13">
                                            <div>
                                            {   
                                                fileName && fileName.length > 0?
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <h4 className="h5 text-secondary">Selected File <i  className="fa fa-arrow-circle-right text-info" />&nbsp;&nbsp;&nbsp;{fileName}</h4>
                                                    <button type="button" onClick={()=>uplopadFile(false)}  className="m-5 btn btn-outline-success has-icon">Validate Trackings</button>
                                                </div>
                                                :
                                                <></>
                                            }
                                            </div>
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
                                        <div className='d-flex justify-content-center '>
                                            <button style={{width:"20%"}} type="button" onClick={()=>uplopadFile(true)}  
                                            className="m-5 btn btn-success has-icon">Validate Trackings</button>
                                        </div>      
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>    
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadContent;