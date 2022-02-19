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
        axios.get('/table/user-document-logging')
        .then(function (response) {
            $('#invalidTracingTable').DataTable({
                data: response.data.data,
                "lengthMenu": [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
                pageLength: 10,
                columns: [
                    { data:"user_id", title: "Id" },
                    { data:"user_name", title: "Name" },
                    { data:"process_id", title: "Process Id" },
                    { data:"perform_at", title: "Perform At" },
                    { data:"description", title: "description" },
                    { data:"action", title: "Action" },
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
                                <h6>User Document Records</h6>
                            </div>
                            <div className="ms-panel-body">
                                <div className="table-responsive">
                                    <table id="invalidTracingTable" className="table w-100 thead-primary" />
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