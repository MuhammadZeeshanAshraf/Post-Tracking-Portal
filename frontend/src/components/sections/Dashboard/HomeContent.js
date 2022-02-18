import React, { useEffect, useState } from 'react';
import "../../../assets/css/homeContent.css"
import axios from 'axios';
import Breadcrumb from '../Roles/Breadcrumb';
import InvalidTrackings from './InvalidTrackings';
import ShipmentRecords from './ShipmentRecords';
import UploadedRecords from './UploadedRecords';

const HomeContent = () => {
    const [staticsData, setStaticsData] = useState(
        {
            "order_shipped": "0",
            "order_booked": "0",
            "booked_amount": "0",
            "shipping_alert": "0",
            "all_customer_numbers": "0",
            "totall_number_missing": "0"
          }
    );
    
    const getStats = async () =>{
        axios.get('/import-process/statistics')
        .then(function (response) {
            setStaticsData(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log("Error in getting roles data");
        })
    }
  
    useEffect(()=>{
        const fetchData = async () => {
            await getStats();
        }
         fetchData();
    }, []);


    return (
        <div className="ms-content-wrapper">
            <div className="col-md-12">
                <Breadcrumb />
                <div className="chartsMain">
                    <div  className="chartRow d-flex">
                        <div className="chartContent color1">
                            <strong>{staticsData.order_shipped}</strong>
                            <h5>Order Shipped</h5>
                        </div>
                        <div className="chartContent color2">
                            <strong>{staticsData.order_booked}</strong>
                            <h5>Order Booked</h5>
                        </div>
                        <div className="chartContent color3">
                            <strong>{staticsData.booked_amount}</strong>
                            <h5>Booked Amount</h5>
                        </div>
                    </div>

                    <div  className="chartRow d-flex">
                        <div className="chartContent color4">
                            <strong>{staticsData.shipping_alert}</strong>
                            <h5>Shipment Alert</h5>
                        </div>
                        <div className="chartContent color5">
                            <strong>{staticsData.all_customer_numbers}</strong>
                            <h5>All Customer Numbers</h5>
                        </div>
                        <div className="chartContent color6">
                            <strong>{staticsData.totall_number_missing}</strong>
                            <h5>Total Number Missing</h5>
                        </div>
                    </div>
                </div>
                <UploadedRecords />
                <ShipmentRecords/>
                <InvalidTrackings/>    
            </div>
        </div>
    );
};

export default HomeContent;