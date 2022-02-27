import React, { useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';

const WorkingRecordModal = ({processId, fileName})=> {
     
    const [data, setData] =  useState([]);
    
    useEffect(()=>{
        $('#workingRecordTable').DataTable({
            destroy: true,
            data:data,
            lengthMenu: [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            language: {
                "emptyTable": "No record found"
            },
            columns: [
                { data:"tracking_id", title: "Tracking Id" },
                { data:"contact_number", title: "Contact Number" },
                { data:"TYPE", title: "Type" },
                { data:"booked_at", title: "Booked At" },
                { data:"booking_date", title: "Booking Date & Time" },
                { data:"customer_pin_code", title: "Destination Pin Code" },
                { data:"delivery_location", title: "Destination Location" },
                { data:"amount", title: "Tariff" },
                { data:"book_status", title: "Book Status" },
            ],
        });
    }, [data]);

    useEffect(()=>{
        let url = `/import-process/data-by-id?ProcessId=${processId}`;
        axios.get(url)
        .then(function (response) {
            setData(response.data.trackingData);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }, [processId, fileName]);

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
                                <table id="workingRecordTable" className="table w-100 thead-primary" >
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkingRecordModal;