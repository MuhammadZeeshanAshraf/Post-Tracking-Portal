import React, { Component } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';
import axios from 'axios';

class ContentTable extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }


    componentDidMount() {
        axios.get('/table/all-customers')
        .then(function (response) {
            console.log(response.data.data);

            $('#customerTable').DataTable({
                data: response.data.data,
                "lengthMenu": [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
                pageLength: 10,
                columns: [
                    { data:"create_date", title: "Date" },
                    { data:"file_name", title: "File Name" },
                    { data:"total_mobile_numbers", title: "Total Number of Customer Mobile Nubmers" },
                    // { data:"contact_number", title: "Actions" },
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
                                <h6>Customer</h6>
                            </div>
                            <div className="ms-panel-body">
                                <div className="table-responsive">
                                    <table id="customerTable" className="table w-100 thead-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentTable;

