import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    alternative_phone: Yup.string()
        .required('ALternative number is required')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "Invalid phone number"),
    primary_phone: Yup.string()
        .required('Phone number is required')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,"Invalid phone number"),
    dob: Yup.string()
        .required('Date of Birth is required'),
        // .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    father_name: Yup.string()
        .required('Father Name is required'),
    mother_name: Yup.string()
        .required('Mother Name is required'),
});
  
const register = (values)=>{
    axios.post('/user/register', values)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
  });
}
const RegForm = () => {
    return (
        <Formik
         validationSchema={validationSchema}
         onSubmit={(values) => {
            register(values);
          }}
         initialValues={{
           name: '',
           primary_phone: '',
           alternative_phone:'',
           dob: '',
           email: '',
           father_name:'',
           mother_name:'',
           password: '',
           confirmPassword: '',
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
                <div className="ms-auth-col">
                    <div className="ms-auth-bg" />
                </div>
                <div className="ms-auth-col">
                    <div className="ms-auth-form">
                        <form   style={{height:"90%", marginBottom:'20px' }} noValidate>
                            <h3>Create Account</h3>
                            <p>Please enter personal information to continue</p>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Name</label>
                                    <div className="input-group">
                                        <input 
                                         type="text" 
                                         className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} 
                                         placeholder="Name" 
                                         name="name"
                                         value={values.name}
                                         onChange={handleChange}
                                         required />
                                       <div className="invalid-feedback">
                                            {errors.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                    <label>Phone Number</label>
                                    <div className="input-group">
                                        <input 
                                         type="text" 
                                         className={`form-control ${touched.primary_phone && errors.primary_phone ? 'is-invalid' : ''}`} 
                                         placeholder="Phone Number" 
                                         name="primary_phone"
                                         value={values.primary_phone}
                                         onChange={handleChange}
                                         required />
                                       <div className="invalid-feedback">
                                            {errors.primary_phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Alternative Number</label>
                                    <div className="input-group">
                                        <input 
                                         type="text" 
                                         className={`form-control ${touched.alternative_phone &&  errors.alternative_phone ? 'is-invalid' : ''}`} 
                                         placeholder="Alternative Number" 
                                         name="alternative_phone"
                                         value={values.alternative_phone}
                                         onChange={handleChange}
                                         required />
                                       <div className="invalid-feedback">
                                            {errors.alternative_phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Date of Birth</label>
                                    <div className="input-group">
                                        <input 
                                         type="date" 
                                         className={`form-control ${touched.dob && errors.dob ? 'is-invalid' : ''}`} 
                                          name="dob"
                                          value={values.dob}
                                          onChange={handleChange}
                                          required />
                                        <div className="invalid-feedback">
                                            {errors.dob}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Father's Name</label>
                                    <div className="input-group">
                                        <input 
                                            type="text"
                                            className={`form-control ${touched.father_name && errors.father_name ? 'is-invalid' : ''}`} 
                                            value={values.father_name}
                                            onChange={handleChange}
                                            name="father_name"
                                            value={values.father_name}
                                            onChange={handleChange} 
                                            placeholder="Father's Name"
                                            required />
                                        <div className="invalid-feedback">
                                        {errors.father_name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Mother's Name</label>
                                    <div className="input-group">
                                        <input type="text"
                                            className={`form-control ${touched.mother_name && errors.mother_name ? 'is-invalid' : ''}`} 
                                            value={values.mother_name}
                                            onChange={handleChange}
                                            name="mother_name"
                                            value={values.mother_name}
                                            onChange={handleChange} 
                                            placeholder="Mother's Name"
                                            required />
                                        <div className="invalid-feedback">
                                        {errors.mother_name}
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
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Confirfm Password</label>
                                    <div className="input-group">
                                        <input type="password"
                                            className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`} 
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange} 
                                            placeholder="Confirm Password"
                                            required />
                                        <div className="invalid-feedback">
                                        {errors.confirmPassword}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-4 d-block w-100" onClick={handleSubmit} type="submit">Create Account</button>
                            <p style={{paddingBottom: '100px'}} className="mb-0 mt-3 text-center">Already have an account? <Link className="btn-link" to="/login">Login</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )}
        </Formik>
    );
}

export default RegForm;