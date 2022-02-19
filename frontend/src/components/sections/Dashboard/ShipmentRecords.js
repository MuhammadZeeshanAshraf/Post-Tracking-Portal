import React, { Component, useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';

const ShipmentRecords = ({startDate, endDate})=> {
     
    const [data, setData] =  useState([]);
    
    useEffect(()=>{
        $('#shipmentRecordsTable').DataTable({
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
        let url ="/table/all-trackings";
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
            setData(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }, [startDate, endDate]);

    return (
        <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <h6>Shipment Wise Records</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="table-responsive">
                                <table id="shipmentRecordsTable" className="table w-100 thead-primary" >
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentRecords;