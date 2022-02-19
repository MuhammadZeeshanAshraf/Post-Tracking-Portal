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
        axios.get('/table/all-import-process')
        .then(function (response) {

        $('#data-table-4').DataTable({
            data: response.data.data,
            "lengthMenu": [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            columns: [
                { data:"create_date", title: "Uploaded Date" },
                { data:"file_name", title: "File Name" },
                { data:"total_tracking_ids", title: "Total Tracking Uploaded" },
                { data:"not_book_ids", title: "No. of Duplicate Trackings" },
                { data:"book_ids", title: "Actual Trackings " },
                { data:"book_ids", title: "Workings Trackings " },
                { data:"not_book_ids", title: "Total    Tracking Issues" },
            ],
        });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
        console.log('this.state,',this.state);
    }

    render() {

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Uploaded Records</h6>
                            </div>
                            <div className="ms-panel-body">
                                <div className="table-responsive">
                                    <table id="data-table-4" className="table w-100 thead-primary" >
                                    </table>
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