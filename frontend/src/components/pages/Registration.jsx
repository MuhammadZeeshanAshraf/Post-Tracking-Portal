import React, { useState } from 'react';
import RegForm from '../sections/Defaultregister/RegForm';
import LoadingOverlay from 'react-loading-overlay';

const Registration= ()=> {
    const [startLoading, setStartLoading] = useState(false);
    return (
        <LoadingOverlay
            active={startLoading}
            spinner
            text='Saving ...'>
        <div className="ms-body ms-primary-theme ms-logged-out">
            <main className="body-content">
                <RegForm setStartLoading = {setStartLoading}/>
            </main>
        </div>
        </LoadingOverlay>
    );
}
export default Registration;