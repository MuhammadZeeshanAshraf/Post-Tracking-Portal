import React from 'react';
import Breadcrumb from '../Datatable/Breadcrumb';
import "../../../assets/css/homeContent.css"

const HomeContent = () => {
    return (
        <div className="ms-content-wrapper">
            <div className="col-md-12">
                {/* <Breadcrumb /> */}
                <div className="chartsMain">
                    <div  className="chartRow d-flex">
                        <div className="chartContent color1">
                            <h5>8,378,188.0</h5>
                            <h5>Total Orders</h5>
                        </div>
                        <div className="chartContent color2">
                            <h5>8,378,188.0</h5>
                            <h5>Total Orders</h5>
                        </div>
                        <div className="chartContent color3">
                            <h5>8,378,188.0</h5>
                            <h5>Total Orders</h5>
                        </div>
                        
                    </div>
                    <div  className="chartRow d-flex">
                        <div className="chartContent color4">
                            <h5>8,378,188.0</h5>
                            <h5>Total Orders</h5>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default HomeContent;