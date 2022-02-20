import React from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Content from '../sections/Customer/Content';

const Customer = () => {  
    return (
    <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
    <Sidenavigation />
    <main className="body-content">
        <Topnavigation />
        <Content/>
    </main>
</div>
);

};

export default Customer;