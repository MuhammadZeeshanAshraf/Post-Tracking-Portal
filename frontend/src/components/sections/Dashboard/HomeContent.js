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
                            <h5>{staticsData.order_shipped}</h5>
                            <h5>Order Shipped(Uploaded)</h5>
                        </div>
                        <div className="chartContent color2">
                            <h5>{staticsData.order_booked}</h5>
                            <h5>Order Booked</h5>
                        </div>
                        <div className="chartContent color3">
                            <h5>{staticsData.booked_amount}</h5>
                            <h5>Booked Amount(Total)</h5>
                        </div>
                        
                    </div>
                    <div  className="chartRow d-flex">
                        <div className="chartContent color4">
                            <h5>{staticsData.order_booked}</h5>
                            <h5>Total Orders</h5>
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