import { Formik } from 'formik';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from '../../custom_hooks/UserContext';
  
const ProfileModal = ({setStartLoading}) => {
    const history = useHistory();
    const {user} = useContext(UserContext);
    const [profileImage, setProfileImage] = useState(user.profile_image);
    return (
        <Formik
         onSubmit={(values) => {
          }}
         initialValues={user}
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
        <div className="ms-content-wrapper ms-profile">
            <div className="ms-auth-container">
                <div className="ms-auth-col ">
                    <div className="ms-auth-form">
                        <form   style={{ flex:1, marginBottom:'20px' }} noValidate>
                            <h3>Profile</h3>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <div className='d-flex flex-row algin-items-center justify-content-center'>
                                    {
                                        profileImage?                                    
                                        <img 
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 200 / 2,
                                                borderColor: 'gray',
                                                borderWidth: 2,
                                            }}
                                            src={profileImage}
                                        />
                                        :
                                        <></>
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Name</label>
                                    <div className="input-group">
                                        <input
                                        disabled={true} 
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
                                        disabled={true} 
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
                                        disabled={true} 
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
                                        disabled={true} 
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
                                        disabled={true} 
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
                                            disabled={true} 
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
                                            disabled={true} 
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
                            {/* <div className="form-row">
                                <div className="col-md-12 ">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <input 
                                        disabled={true} 
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
                                            disabled={true} 
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
                            </div> */}
                            {/* <button className="btn btn-primary mt-4 d-block w-100" onClick={handleSubmit} type="submit">Create Account</button> */}
                            {/* <p style={{paddingBottom: '100px'}} className="mb-0 mt-3 text-center">Already have an account? <Link className="btn-link" to="/login">Login</Link> </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )}
        </Formik>
    );
}

export default ProfileModal;