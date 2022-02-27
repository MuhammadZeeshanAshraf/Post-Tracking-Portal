import React, { useEffect, useState } from 'react';
import SearchFilter from '../../common/SearchFilter';
import Breadcrumb from './Breadcrumb'
import ContentTable from './ContentTable';

const Content = () => {
    const [startDate, setStartDate]= useState('');
    const [endDate, setEndDate]= useState('');
    
    useEffect(()=>{
        // const fetchData = async () => {
        //     await getStaff();
        //     await getRoles();
        //  }
       
        //  fetchData();
    }, []);

    return (
    <div className="ms-content-wrapper">
        <div className="row">
            <div className="col-md-12">
                <Breadcrumb />
                <SearchFilter setStartDate={setStartDate} setEndDate={setEndDate} />
                <ContentTable startDate={startDate} endDate={endDate} endPoint="/table/all-trackings" />
            </div>
        </div>
    </div>
    );
};

export default Content;