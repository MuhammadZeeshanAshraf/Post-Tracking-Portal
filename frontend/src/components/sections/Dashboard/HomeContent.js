import React, { useEffect, useState } from 'react';
import "../../../assets/css/homeContent.css"
import axios from 'axios';
import Breadcrumb from './Breadcrumb';
import InvalidTrackings from './InvalidTrackings';
import ShipmentRecords from './ShipmentRecords';
import UploadedRecords from './UploadedRecords';
import { Bar as BarChart } from 'react-chartjs-2';
import { Pie as PieChart } from 'react-chartjs-2';
import Chart from "react-google-charts";


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
    const [startDate, setStartDate]= useState('');
    const [endDate, setEndDate]= useState('');
    const [chartData, setChartData]= useState([0,0,0,0,0,0]);
    const [donughtChartData, setDonughtChartData]= useState([
        ["Order shipped", 0],
        ["Order booked", 0],
        ["Booked amount", 0],
        ["Shipping alert", 0],
        ["All Customer numbers", 0],
        ["Total numbers missing", 0]]);
    
    const onFileter = () =>{
        setEndDate(document.getElementById('endDate').value);
        setStartDate(document.getElementById('startDate').value);

    }
    const getStats = async () =>{
        let url ="/import-process/statistics";
        var param = "";

        if(startDate && startDate.length>0){
            param = "startDate="+startDate;
        }
    
        if(endDate && endDate.length > 0){
            if(param.length > 0 ){
                param = param + "&";
            }
            param = param + "endDate="+endDate
        }

        if(param.length > 0){
            url = url + "?"+param;
        }
        axios.get(url)
        .then(function (response) {
            setStaticsData(response.data);
            let list = []
            let dounghtList = []

            for (const key in response.data) {
                list.push(response.data[key])
                let _key = key.replaceAll('_', ' ');
                _key = _key.charAt(0).toUpperCase() +  _key.slice(1);
                dounghtList.push([_key, response.data[key]])
            }
            setChartData(list);
            setDonughtChartData(dounghtList)
        })
        .catch(function (error) {
            // handle error
            console.log("Error in getting roles data");
        })
    }
  
    // Bar chart
    function pieChartData() {
        return {
            labels: ["Order Shipped", "Order Booked", "Booked Amount", "Shipment Alert","Total Customer Number" ,"Total Numbers Missing"],
            datasets: [{
                label: "Distribution of Order",
                backgroundColor: ["#ff0018", "#f7b11b", "#ff6c60", "#8663e1", "#08bf6f", "##3399ff"],
                data:chartData
            }]
        }
    }
    const pieOptions = {
        title: {
            display: true,
            text: 'Distribution of Order'
        }
    }

    function barChartData() {
        return {
            labels: ["Order Shipped", "Order Booked", "Booked Amount", "Shipment Alert","Total Customer Number", "Total Numbers Missing"],
            datasets: [{
                label: "Distribution of Order",
                backgroundColor: ["#ff0018", "#f7b11b", "#ff6c60", "#8663e1", "#08bf6f", "#3399ff"],
                data: chartData
            }]
        }
    }
    const barOptions = {
        legend: { display: false },
        title: {
            display: true,
            text: 'Distribution of Order'
        }
    }

    useEffect(()=>{
        const fetchData = async () => {
            await getStats();
        }
         fetchData();
    }, [startDate, endDate]);


    return (
    //     <div className="ms-content-wrapper">
    //     <div className="row">
    //         <div className="col-md-12">
    //             <div className="ms-panel">
    //                 <div className="ms-panel-header">
    //                     <h6>Uploaded Records</h6>
    //                 </div>
    //                 <div className="ms-panel-body">
    //                     <div className="table-responsive">
    //                         <table id="data-table-4" className="table w-100 thead-primary" >
    //                         </table>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

        <div className="ms-content-wrapper">
            <div className='row'>
                <div className="col-md-12">
                    <Breadcrumb />
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                                <h6>Search Filter</h6>
                            </div>
                        <div className="ms-panel-body">
                            <div className='row'>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12">
                                    <label for="startDate">Start Date</label>
                                    <input type='date' className='form-control' id="startDate" />
                                </div>
                                <div class="form-group col-xl-3 col-md-12">
                                    <label for="endDate">End Date</label>
                                    <input type='date' className='form-control' id="endDate" />
                                </div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                            </div>
                            <div className='row'>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12">
                                  <button onClick={onFileter} className='btn btn-success'>Search</button>
                                </div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                                <div class="form-group col-xl-3 col-md-12"></div>
                            </div>
                        </div>
                    </div>
                    <div className="ms-panel">
                        <div className="ms-panel-body">
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
                        </div>
                    </div>
                    <div className="ms-panel">
                        <div className="ms-panel-body">
                            <div className="barChartDiv">
                                <BarChart height={'100px'} data={barChartData} options={barOptions} />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                    <div class="col-xl-6 col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-body">
                                <div className="pieChartDiv">
                                <PieChart height={'200px'} data={pieChartData} options={pieOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-body">
                                <div className="pieChartDiv">
                                <Chart
                                    height={'340px'}
                                    chartType="PieChart"
                                    loader={<div>Load ing Chart</div>}
                                    data={[
                                        ['label', 'value'],
                                        ["Order shipped", 1],
                                        ["Order booked", 4],
                                        ["Booked amount", 545],
                                        ["Shipping alert", 5],
                                        ["All Customer numbers", 234],
                                        ["Total numbers missing", 24]]}
                                    options={{
                                        legend: { position: 'none' },
                                        // Just add this option
                                        pieHole: 0.6,
                                        colors: ['#0b62a4', '#3980b5', '#679dc6','#224C6C', '#AFCCE1', '#1C405A'],
                                    }}
                                    rootProps={{ 'data-testid': '3' }}
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <UploadedRecords startDate={startDate}  endDate={endDate} />
                    <ShipmentRecords startDate={startDate}  endDate={endDate}/>
                    <InvalidTrackings startDate={startDate}  endDate={endDate}/>    
                </div>
            </div>
        </div>
    );
};

export default HomeContent;