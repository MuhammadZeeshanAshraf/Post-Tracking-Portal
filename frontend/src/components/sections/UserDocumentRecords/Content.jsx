import React, { useEffect } from 'react';
import Breadcrumb from './Breadcrumb'
import ContentTable from './ContentTable';

const Content = () => {
    
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
                <ContentTable/>
            </div>
        </div>
    </div>
    );
};

export default Content;