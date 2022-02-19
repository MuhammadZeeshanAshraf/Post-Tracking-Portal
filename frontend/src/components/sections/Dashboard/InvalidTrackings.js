import React, { Component, useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';

const InvalidTrackings = ({startDate, endDate})=> {
     
    const [data, setData] =  useState([]);
    
    useEffect(()=>{
        $('#invalidTracingTable').DataTable({
            destroy: true,
            data:data,
            lengthMenu: [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            language: {
                "emptyTable": "No record found"
            },
            columns: [
                { data:"create_date", title: "Date Uploaded" },
                { data:"tracking_id", title: "Tracking Id" },
                { data:"file_name", title: "File Name" },
                { data:"contact_number", title: "Contact Number" },
            ],
        }); 
    }, [data]);

    useEffect(()=>{
        let url ="/table/all-invalid-trackings";
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
                            <h6>Trackings Issues</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="table-responsive">
                                <table id="invalidTracingTable" className="table w-100 thead-primary" >
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvalidTrackings;