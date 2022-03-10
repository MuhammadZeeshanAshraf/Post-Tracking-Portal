import React, { useEffect, useState } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';

const ContentTable = ({dataRow})=> {

    const [data, setData] =  useState(dataRow);

    useEffect(()=>{
        setData(dataRow);
    }, [dataRow]);

    useEffect(()=>{
        $('#platformTable').DataTable({
            destroy: true,
            data:data,
            lengthMenu: [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            language: {
                "emptyTable": "No process record"
            },
            columns: [
                { data:"tracking_id", title: "Date Uploaded" },
                { data:"data_status", title: "" },
                { data:"TYPE", title: "Tracking Id" },
                { data:"booked_at", title: "File Name" },
                { data:"booking_date", title: "File Name" },
                { data:"contact_number", title: "Contact Number" },
                { data:"customer_pin_code", title: "Contact Number" },
                { data:"amount", title: "Contact Number" },
                { data:"book_status", title: "Contact Number" },
            ],
            columnDefs:[
                { targets : [1] ,
                    render: function ( data, type, row, meta ) {
                        if(!data || data !== "Full Data")
                            return '<span class="badge badge-warning">Incomplete Data</span>';
                        else 
                            return '<span class="badge badge-success">Full Data</span>'
                    }
                },
            ]
        }); 
    }, [data]);

    return (
        // <div className="ms-panel-body">
            <div className="table-responsive">
                <table id="platformTable" className="table w-100 thead-primary" />
            </div>
        // </div>
    );
}

export default ContentTable;