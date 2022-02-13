import React from 'react';
import Otpinput from './Otpinput';

function OtpContent(props) {
    return (
        <div style={{paddingTop:"5%"}} className="d-flex flex-column justify-content-center align-items-center">
            <div style={{backgroundColor:"red", width:"60%", height:500 ,borderRadius:"10px"}}
                 className="bg-primary align-self-center d-flex flex-column justify-content-center align-items-center">
                <h5 className='text-light' >Please Enter one time OTP to verify your account</h5>
                <p className='text-light'>A One-time OTP has sent to your email</p>
                <Otpinput/>
            </div>
        </div>
    );
}

export default OtpContent;