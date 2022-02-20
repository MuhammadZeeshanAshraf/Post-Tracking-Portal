import React from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import StaffContent from '../sections/AssignRoles/StaffContent';

const Staff = () => {  
    return (
    <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
    <Sidenavigation />
    <main className="body-content">
        <Topnavigation />
        <StaffContent/>
    </main>
</div>
);

};

export default Staff;