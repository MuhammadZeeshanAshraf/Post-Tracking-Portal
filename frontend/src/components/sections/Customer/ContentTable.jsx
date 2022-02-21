import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import CustomerModal from './CustomerModal';

const ContentTable = ({startDate, endDate})=> {

    const [data, setData] =  useState([]);
    const [processId, setProcessId] = useState([]);
    const [fileName, setFileName] = useState([]); 
    // const [loading, setLoading]  = useState(false);
    const [showModal, setShowModal]  = useState(false);


    const handlePreview = async (id, fileName) => {
        setFileName(fileName);
        setProcessId(id);
        setShowModal(!showModal);
     };

     const exportFile = async (processId) => {
         console.log('processId', processId);
      };
    
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
                            <a style={{cursor:"pointer"}} onClick={()=>handlePreview(rowData.id, rowData.file_name)} className="fas fa-eye text-success"></a >
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
        var param = "";

        if(startDate && startDate.length>0){
            param = "startDate="+startDate;
        }
    
        if(endDate && endDate.length > 0){
            if(param.length > 0 ){
                param = param + "&";
            }
            param = param + "endDate="+endDate
        }

        if(param.length > 0){
            url = url + "?"+param;
        }
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
    }, [startDate, endDate]);

    return (
        <>
        <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <h6>Customer</h6>
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
        <Modal className="modal-min" show={showModal} onHide={()=>setShowModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body className="text-center">
                <button type="button" className="close" onClick={()=>setShowModal(false)}><span aria-hidden="true">×</span></button>
                <CustomerModal processId={processId} fileName={fileName} />
            </Modal.Body>
        </Modal>
        </>
    );
};

export default ContentTable;