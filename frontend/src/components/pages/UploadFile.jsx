import React from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import UploadContent from '../sections/Upload/Cotnent';

function UploadFile(props) {
    return (
        <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
        <Sidenavigation />
        <main className="body-content">
            <Topnavigation />
            <UploadContent/>
        </main>
    </div>
    );
}
export default UploadFile;
