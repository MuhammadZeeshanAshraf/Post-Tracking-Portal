import React, { useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import download from "downloadjs";
import ReactDOM from 'react-dom'
import ShipmentRecords from '../ShipmentWiseRecord/ContentTable'

const ContentTable = ({startDate, endDate})=> {
     
    const [data, setData] =  useState([]);
    const [processId, setProcessId] = useState([]);
    const [fileName, setFileName] = useState([]); 
    const [showModal, setShowModal]  = useState(false);
    
    const handlePreview = async (id, fileName) => {
        setFileName(fileName);
        setProcessId(id);
        setShowModal(!showModal);
    };
    const exportFile = async (processId) => {
        // setLoading(true);
        axios({
        method: "get",
        url: `/export/tracking-file?${processId}`,
        responseType: "blob",
        params: {
            ProcessId:processId
        }
        })
        .then(async (res) => {
            const blob = new Blob([res.data], { type: "application/xlsx" });
            const name = "Working Records.xlsx";
            // setLoading(false);
            download(blob, name);
        })
        .catch((error) => {
            // setLoading(false);
            console.log(error);
        });
    };

    useEffect(()=>{
        $('#uploadedRecordsTable').DataTable({
            destroy: true,
            data:data,
            lengthMenu: [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            language: {
                "emptyTable": "No record found"
            },
            columns: [
                { data:"create_date", title: "Uploaded Date" },
                { data:"file_name", title: "File Name" },
                { data:"total_tracking_ids", title: "Total Tracking Uploaded" },
                { data:"not_book_ids", title: "No. of Duplicate Trackings" },
                { data:"book_ids", title: "Actual Trackings " },
                { data:"book_ids", title: "Workings Trackings " },
                { data:"not_book_ids", title: "Total Tracking Issues" },
                { data:"actions", title: "Actions (Working Records)" },
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
        let url ="/table/all-import-process";
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
        console.log(url);
        axios.get(url)
        .then(function (response) {
            let list = response.data.data.map(row=>{
                return {...row, actions:""}  
            })
            setData(list);
            // setData(response.data.data);
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
                            <h6>Uploaded Records</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="table-responsive">
                                <table id="uploadedRecordsTable" className="table w-100 thead-primary" >
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
                <ShipmentRecords startDate={startDate}  endDate={endDate} endPoint={`/import-process/data-by-id=${processId}`} />
            </Modal.Body>
        </Modal>
        </>
    );
};

export default ContentTable;