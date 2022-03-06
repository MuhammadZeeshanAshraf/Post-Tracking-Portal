import axios from "axios";
import React, { useState } from "react";
import "../../assets/css/switch.css";
import { errorToast, successToast } from "../utility/common";

const Switch = ({ isOn, id , onColor }) => {
   const [value ,   setValue] = useState(isOn);
    return (
    <label style={{ background: "#eee" }} className="react-switch">
      <input
        checked={value ==1 ? false : true}
        onChange={()=>{
            setValue(value ==1? 0 :1);
            axios.post('/user/activeController', {
                id: id+"",
                active: value ==1? 0 :1
              })
              .then(function (response) {
                if(response.data.userId){
                    successToast("Success" ,"Successfully updated the status")
                } else{
                    errorToast("Oops", "Error in updating the user status");
                }
              })
              .catch(function (error) {
                errorToast("Oops", "Error contacting with server");
            });
        }}
        className="react-switch-checkbox"
        type="checkbox"
      />
      <div className="react-switch-button" />
      <div className="react-switch-labels">
        <span>Active</span>
        <span>Inactive</span>
      </div>
    </label>
  );
};

export default Switch;
