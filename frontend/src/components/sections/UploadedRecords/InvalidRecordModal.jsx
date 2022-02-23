import React, { useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';

const InvalidRecordModal = ({processId, fileName})=> {
    console.log("processId===000==", processId);
     
    const [data, setData] =  useState([]);
    
    useEffect(()=>{
        $('#InvalidRecordModalTable').DataTable({
            destroy: true,
            data:data,
            lengthMenu: [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            language: {
                "emptyTable": "No record found"
            },
            columns: [
                { data:"tracking_id", title: "Tracking Id" },
                { data:"file_name", title: "File Name" },
                { data:"contact_number", title: "Contact Number" },
                { data:"create_date", title: "Create Date" },
            ]
        }); 
    }, [data]);

    useEffect(()=>{
        let url =`/view/invalid-trackings?process_id=${processId}`;

        axios.get(url)
        .then(function (response) {
            setData(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }, [processId]);

    return (
        <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <h6>{fileName}</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="table-responsive">
                                <table id="InvalidRecordModalTable" className="table w-100 thead-primary" >
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvalidRecordModal;