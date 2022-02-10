import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});
  
const register = (values)=>{
    axios.post('/user/register', values)
    .then(function (response) {
        if(response == "OK"){
            
        }
    })
    .catch(function (error) {
      console.log(error);
  });
}
const LoginForm = () => {
    return (
        <Formik
         validationSchema={validationSchema}
         onSubmit={(values) => {
            register(values);
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
    );
}

export default LoginForm;