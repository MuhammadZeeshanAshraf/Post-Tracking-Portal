import React from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import RoleAddEditContent from '../sections/Roles/RoleAddEditContent';

const AddEditRole = () => {
    return (
        <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
        <Sidenavigation />
        <main className="body-content">
            <Topnavigation />
            <RoleAddEditContent/>
        </main>
    </div>
    );
};

export default AddEditRole;