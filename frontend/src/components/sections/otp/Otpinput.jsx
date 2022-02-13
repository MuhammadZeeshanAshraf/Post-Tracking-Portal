import axios from 'axios';
import React, { Component, ReactDOM } from 'react';
import Button from 'react-bootstrap/Button';
import "../../../assets/css/optinput.css";


class Otpinput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '', otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", disable: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(value1, event) {

    this.setState({ [value1]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = this.state;
    data = data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5; 
    console.log(data);
    axios.get('/otp', {
        otp: data,
      })
      .then(function (response) {
        if(response.data){
            // successToast("Success" ,"Successfully updated the status")
        } else{
            // errorToast("Oops", "Error in updating the user status");
        }
      })
      .catch(function (error) {
        // errorToast("Oops", "Error contacting with server");
    });
  }

  inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {

        elmnt.target.form.elements[next].focus()
      }
    }
    else {
      console.log("next");
     
        const next = elmnt.target.tabIndex;
        if (next < 5) {
          elmnt.target.form.elements[next].focus()
        }
    }

  }

  render() {
    return (
      <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={this.handleSubmit}>
        <div className="otpContainer">

          <input
            name="otp1"
            required={true}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={this.state.otp1}
            onKeyPress={this.keyPressed}
            onChange={e => this.handleChange("otp1", e)}
            tabIndex="1" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp2"
            required={true}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={this.state.otp2}
            onChange={e => this.handleChange("otp2", e)}
            tabIndex="2" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp3"
            required={true}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={this.state.otp3}
            onChange={e => this.handleChange("otp3", e)}
            tabIndex="3" maxLength="1" onKeyUp={e => this.inputfocus(e)}

          />
          <input
            name="otp4"
            required={true}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={this.state.otp4}
            onChange={e => this.handleChange("otp4", e)}
            tabIndex="4" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />

          <input
            name="otp5"
            required={true}
            type="text"
            autoComplete="off"
            className="otpInput"
            value={this.state.otp5}
            onChange={e => this.handleChange("otp5", e)}
            tabIndex="5" maxLength="1" onKeyUp={e => this.inputfocus(e)}
          />
        </div>
        <div>
            <button type="button"  className="btn btn-outline-dark mr-3">Send Again</button>
            <button type="submit" className="btn btn-success">Verify</button>
        </div>
        
      </form>
    );
  }
}


export default Otpinput;