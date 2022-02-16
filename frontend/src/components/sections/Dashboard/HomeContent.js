import React, { useEffect, useState } from 'react';
import "../../../assets/css/homeContent.css"
import axios from 'axios';
import ImportProcess from './ImportProcess';
import Breadcrumb from '../Roles/Breadcrumb';

const HomeContent = () => {
    const [importProcesses, setImportProcesses] = useState([]);
    
    const getImportProcess = () =>{
        axios.get('/table/all-import-process')
        .then(function (response) {
            console.log(response.data.data)
            setImportProcesses(response.data.data);
        })
        .catch(function (error) {
            // handle error
            console.log("Error in getting roles data");
        })
    }
    
    useEffect(()=>{
        const fetchData = async () => {
            await getImportProcess();
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
                <ImportProcess dataList={importProcesses} />
            </div>
        </div>
    );
};

export default HomeContent;