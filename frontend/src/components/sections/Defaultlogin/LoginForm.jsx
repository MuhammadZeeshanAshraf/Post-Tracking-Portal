import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { sweetAlertError } from '../../utility/common';
import LoadingOverlay from 'react-loading-overlay';
import { useCookies } from 'react-cookie';



const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});
  

const LoginForm = () => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [startLoading, setStartLoading] = useState(false);

    const login = (values)=>{
        setStartLoading(true);
        axios.get("https://api.ipify.org/?format=json")
        .then(function(e){
            const data = {
                email:values.email,
                password : values.password,
                ip_address : e.ip
            }

            axios.post('/user/login', data)
            .then(function (response) {
                  setStartLoading(false);
                  if(response.data.user){
                    let date = new Date();
                    date.setTime(date.getTime() + (14*24*60*60*1000));
                    let expires = date.toUTCString();
                    window.location.reload();
                    setCookie('user',{
                        userInfo :response.data.user,
                        expires,
                        isLogin:true
                    });
                    // history.push("/dashboard")
                } else{
                    sweetAlertError("Error", response.data.error);
                }
            })
            .catch(function (error) {
              console.log(error);
              setStartLoading(false);
              sweetAlertError("Error", "Error connecting with server please, try again");
          });  
        }).catch(e=>{
            setStartLoading(false);
        })  
    }

    return (
        <LoadingOverlay
         active={startLoading}
         spinner
         text='Verifying ...'>
        <Formik
         validationSchema={validationSchema}
         onSubmit={(values) => {
            login(values);
          }}
         initialValues={{
           email: '',
           password: '',
            }}
        >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
        <div className="ms-content-wrapper ms-auth">
            <div className="ms-auth-container">
                <div className="ms-auth-login-col">
                    <div className="ms-auth-bg" />
                </div>
                <div className="ms-auth-col">
                    <div className="ms-auth-form">
                        <form noValidate>
                            <h3>Login to Account</h3>
                            <p>Please enter your email and password to continue</p>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Email Address</label>
                                    <div className="input-group">
                                        <input 
                                         type="email"
                                          className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} 
                                          placeholder="Email Address"
                                          name="email"
                                          value={values.email}
                                          onChange={handleChange}
                                          required />
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <input 
                                         className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`} 
                                         type="password" 
                                         placeholder="Password"
                                         name="password"
                                         value={values.password}
                                         onChange={handleChange} 
                                         required />
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-4 d-block w-100" onClick={handleSubmit} type="submit">Sign In</button>
                            <p className="mb-0 mt-3 text-center">Don't have an account? <Link className="btn-link" to="/register">Create Account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            {/* <Modal className="modal-min" show={this.state.show1} onHide={this.handleClose} aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Body className="text-center">
                        <button type="button" className="close" onClick={this.handleClose}><span aria-hidden="true">×</span></button>
                        <i className="flaticon-secure-shield d-block" />
                        <h1>Forgot Password?</h1>
                        <p>Enter your email to recover your password</p>
                        <form method="post">
                            <div className="ms-form-group has-icon">
                                <input type="text" placeholder="Email Address" className="form-control" name="forgot-password" /> <i class="material-icons">email</i>
                            </div>
                            <button type="submit" className="btn btn-primary shadow-none">Reset Password</button>
                        </form>
                    </Modal.Body>
                </Modal> */}
        </div>
        )}
        </Formik>
        </LoadingOverlay>
    );
}

export default LoginForm;