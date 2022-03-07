import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import OtpContent from '../sections/otp/OtpContent';

function Otp(props) {
    return (
        <div className="ms-body ms-primary-theme ms-logged-out">
            <main className="body-content">
                <OtpContent />
            </main>
        </div>
    );
}
export default Otp;