import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import CustomerModal from './CustomerModal';
import download from "downloadjs";
import { sweetAlertError, sweetAlertSuccess } from '../../utility/common';

const ContentTable = ({sDate, eDate})=> {

    const [data, setData] =  useState([]);
    const [processId, setProcessId] = useState([]);
    const [fileName, setFileName] = useState([]); 
    // const [loading, setLoading]  = useState(false);
    const [showModal, setShowModal]  = useState(false);
    const [messageTitle , setMessageTitle] = useState("");
    const [messageContent , setMessageContent] = useState("");
    const [showMessageModal ,setShowMessageModal] = useState(false);
    // const [startDate, setStartDate]= useState('');
    // const [endDate, setEndDate]= useState('');

    const handlePreview = async (id, fileName) => {
        setFileName(fileName);
        setProcessId(id);
        setShowModal(!showModal);
     };

     const filterAndExportFile = () =>{
        sDate = document.getElementById('startDate').value;
        eDate = document.getElementById('endDate').value;

        console.log("startDate", sDate, "endDate", eDate);

        axios({
        method: "get",
        url: `export/customer-file?${sDate}&${eDate}`,
        responseType: "blob",
        params: {
            startDate:document.getElementById('startDate').value,
            endDate:document.getElementById('endDate').value
        }
        })
        .then(async (res) => {
            const blob = new Blob([res.data], { type: "application/xlsx" });
            const name = "Contact Numbers.xlsx";
            // setLoading(false);
            download(blob, name);
        })
        .catch((error) => {
            // setLoading(false);
            console.log(error);
        });
    }

    const exportFile = async (processId) => {
        // setLoading(true);
        axios({
        method: "get",
        url: `export/customer-file-by-process?${processId}`,
        responseType: "blob",
        params: {
            ProcessId:processId
        }
        })
        .then(async (res) => {
            const blob = new Blob([res.data], { type: "application/xlsx" });
            const name = "Contact Numbers.xlsx";
            // setLoading(false);
            download(blob, name);
        })
        .catch((error) => {
            // setLoading(false);
            console.log(error);
        });
    };
    
    const handleSendMessage = ()=>{
        axios.post('/user/activeController')
          .then(async (response)=> {
            setShowMessageModal(false);
            if(response.data.messageSent){
                sweetAlertSuccess(`${messageTitle}: Message Sent Successfully`)
            } else if(response.data.message){
                sweetAlertError("Oops", "Error in saving role, please try again");
            }
          })
          .catch(function (error) {
            sweetAlertError("Oops", "Error connecting with server, please try agian");
        });
    }
    
    useEffect(()=>{
        $('#customerTable').DataTable({
            destroy: true,
            data:data,
            lengthMenu: [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            language: {
                "emptyTable": "No record found"
            },
            columns: [
                { data:"create_date", title: "Date" },
                { data:"file_name", title: "File Name" },
                { data:"total_mobile_numbers", title: "Total Number of Customer Mobile Nubmers" },
                { data:"actions", title: "Actions" },
            ],
            columnDefs :[
               {
                   targets : [-1],
                createdCell: (td, cellData, rowData, row, col) => {
                    ReactDOM.render(
                        <div>
                            <a style={{cursor:"pointer"}} onClick={()=>handlePreview(rowData.id, rowData.file_name)} className="fas fa-eye text-success mr-3"></a >
                            <a style={{cursor:"pointer"}} onClick={()=>exportFile(rowData.id)} className="fas fa-download"></a >
                        </div>
                          , td);
                    },
                }
            ]
        }); 
    }, [data]);

    useEffect(()=>{
        let url ="/table/all-customers";
        axios.get(url)
        .then(function (response) {
            let list = response.data.data.map(row=>{
              return {...row, actions:""}  
            })
            setData(list);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    });

    return (
        <>
        <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                                <h6>Search Filter</h6>
                            </div>
                        <div className="ms-panel-body">
                            <div className='row'>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12">
                                    <label for="startDate">Start Date</label>
                                    <input type='date' className='form-control' id="startDate" />
                                </div>
                                <div class="form-group col-xl-3 col-md-12">
                                    <label for="endDate">End Date</label>
                                    <input type='date' className='form-control' id="endDate" />
                                </div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                            </div>
                            <div className='row'>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12">
                                  <button onClick={filterAndExportFile} className='btn btn-success'>Filter & Download</button>
                                </div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                            </div>
                        </div>
                    </div>
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                            <h6>Customer</h6>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="mr-3">
                                    <button className="btn btn-success" onClick={()=>setShowMessageModal(true)}> Send Message </button>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="ms-panel-body">
                            <div className="table-responsive">
                                <table id="customerTable" className="table w-100 thead-primary" >
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal size="lg" className="modal-min" show={showModal} onHide={()=>setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className="text-center">
                <button type="button" className="close" onClick={()=>setShowModal(false)}><span aria-hidden="true">×</span></button>
                <CustomerModal processId={processId} fileName={fileName} />
            </Modal.Body>
        </Modal>
        <Modal className="modal-min" show={showMessageModal} onHide={()=>setShowMessageModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className="text-center">
                <button type="button" className="close" onClick={()=>setShowMessageModal(false)}><span aria-hidden="true">×</span></button>
                {/* <i className="flaticon-user d-block" /> */}
                <h1>Message</h1>
                <form id="formAddEditRole" onSubmit={handleSendMessage}>
                    <div className="ms-form-group has-icon">
                        <input onChange={(e)=>setMessageTitle(e.target.value)} required type="text" placeholder="Message title" className="form-control" name="messageTitle" />
                    </div>
                    <div className="ms-form-group has-icon">
                        <textarea onChange={(e)=>setMessageContent(e.target.value)} required type="text" placeholder="Enter message text here..." rows="7" className="form-control" name="messageContent" />
                    </div>
                    <button type="submit" disabled={true}  className="btn btn-primary">Send</button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default ContentTable;