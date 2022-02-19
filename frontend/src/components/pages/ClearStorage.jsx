import React from 'react';
import Quickbar from '../layouts/Quickbar';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Content from '../sections/ClearStorage/Content';

const ClearStorage = () => {  
    return (
    <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
    <Sidenavigation />
    <main className="body-content">
        <Topnavigation />
        <Content/>
    </main>
    <Quickbar />
</div>
);

};

export default ClearStorage;