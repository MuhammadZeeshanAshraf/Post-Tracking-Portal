import axios from 'axios';
import React, { Component, ReactDOM } from 'react';
import Button from 'react-bootstrap/Button';
import "../../../assets/css/optinput.css";
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { errorToast } from '../../utility/common';
import { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';


const Otpinput = () => {
  const location = useLocation();
  const history = useHistory();
  const [startLoading, setStartLoading] = useState(false);
  const [state , setState] = useState({ value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: "", disable: true });
  const handleChange = (value1, event)=> {
    setState({...state, [value1]: event.target.value });
  }

  const handleSubmit = (event)=> {
    event.preventDefault();
    let data = state;
    data = data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5+ data.otp6; 
    setStartLoading(true);
    axios.post('user/verifyotp', {
        otp: data,
        id: location.state?.userId
      })
      .then(function (response) {
        setStartLoading(false);
        if(response.data.userId){
          history.push({
            pathname: '/login',
            state: { userId: response.data.userId }
          });
        } else{
            errorToast("Invalid OTP", "please try again");
        }
      })
      .catch(function (error) {
        setStartLoading(false);
        errorToast("Oops", "Error contacting with server");
    });
  }

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {

        elmnt.target.form.elements[next].focus()
      }
    }
    else {
     
        const next = elmnt.target.tabIndex;
        if (next < 6) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }
    return (
      <LoadingOverlay
      active={startLoading}
      spinner
      text='Verifying ...'>
        <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
          <div className="otpContainer">

            <input
              name="otp1"
              required={true}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={state.otp1}
              // onKeyPress={keyPressed}
              onChange={e => handleChange("otp1", e)}
              tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

            />
            <input
              name="otp2"
              required={true}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={state.otp2}
              onChange={e => handleChange("otp2", e)}
              tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

            />
            <input
              name="otp3"
              required={true}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={state.otp3}
              onChange={e => handleChange("otp3", e)}
              tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

            />
            <input
              name="otp4"
              required={true}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={state.otp4}
              onChange={e => handleChange("otp4", e)}
              tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
            />

            <input
              name="otp5"
              required={true}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={state.otp5}
              onChange={e => handleChange("otp5", e)}
              tabIndex="5" maxLength="1" onKeyUp={e => inputfocus(e)}
            />
            <input
              name="otp6"
              required={true}
              type="text"
              autoComplete="off"
              className="otpInput"
              value={state.otp6}
              onChange={e => handleChange("otp6", e)}
              tabIndex="6" maxLength="1" onKeyUp={e => inputfocus(e)}
            />
          </div>
          <div>
              {/* <button type="button"  className="btn btn-outline-dark mr-3">Send Again</button> */}
              <button type="submit" className="btn btn-success">Verify</button>
          </div>
          
        </form>
      </LoadingOverlay>
    );
}

export default withRouter(Otpinput);;