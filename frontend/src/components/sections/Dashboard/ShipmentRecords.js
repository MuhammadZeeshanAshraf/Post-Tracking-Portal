import React, { Component } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';

class ShipmentRecords extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }


    componentDidMount() {
        axios.get('/table/all-trackings')
        .then(function (response) {
            console.log(response.data.data);

            $('#trackingTable').DataTable({
                data: response.data.data,
                "lengthMenu": [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
                pageLength: 10,
                columns: [
                    { data:"tracking_id", title: "Tracking Id" },
                    { data:"contact_number", title: "Contact Number" },
                    { data:"TYPE", title: "TYPE" },
                    { data:"booked_at", title: "Booked At" },
                    { data:"booking_date", title: "Booking Date & Time" },
                    { data:"customer_pin_code", title: "Destination Pin Code" },
                    { data:"delivery_location", title: "Destination Location" },
                    { data:"amount", title: "Tariff" },
                    { data:"book_status", title: "Book Status" },
                ],
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {

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
                                    <table id="trackingTable" className="table w-100 thead-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShipmentRecords;

