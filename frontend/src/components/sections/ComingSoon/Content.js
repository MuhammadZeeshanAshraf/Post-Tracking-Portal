import React, { Component } from 'react';
import CMimage from '../../../assets/img/costic/comingSoon.png'

class Content extends Component {
    render() {
        return (
            <div className="ms-content-wrapper ms-coming-soon p-0">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                    <img src={CMimage} />
                </div>
            </div>
        );
    }
}

export default Content;