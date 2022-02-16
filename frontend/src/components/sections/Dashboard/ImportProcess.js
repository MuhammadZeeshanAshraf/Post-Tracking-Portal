import React, { Component } from 'react';
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css"
import $ from 'jquery';

class ImportProcess extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: this.props.dataList,
        };
      }
      componentWillReceiveProps(nextProps) {
          this.setState({ data: nextProps.dataList});
        }
        
    componentDidMount() {
        console.log('this.state,',this.state);
    }

    componentDidUpdate(prevProps) {
        
        $('#data-table-4').DataTable({
            data: this.state.data,
            "lengthMenu": [[10, 15, 25, 35,-1], [10, 15, 25, 35, "All"]],
            pageLength: 10,
            columns: [
                { data:"id", title: "Id" },
                { data:"total_tracking_ids", title: "Total Tracking Ids" },
                { data:"book_ids", title: "Book Ids" },
                { data:"not_book_ids", title: "Not Book Ids" },
                { data:"book_on_same_date", title: "Book on Same Date" },
                { data:"not_book_on_same_date", title: "Not Book on Same Date" },
                { data:"total_bill", title: "Total Bill" },
                { data:"create_date", title: "Create Date" },
                { data:"file_name", title: "File Name" },
                { data:"status", title: "Status" },
                { data:"total_mobile_numbers", title: "Total Mobile Numbers" },
                { data:"total_missing_numbers", title: "Total Missing nubmers" },

            ],
        });
      }

    render() {

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Responsive Datatable</h6>
                            </div>
                            <div className="ms-panel-body">
                                <div className="table-responsive">
                                    <table id="data-table-4" className="table w-100 thead-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImportProcess;