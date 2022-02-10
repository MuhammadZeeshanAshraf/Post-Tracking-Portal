import React, { Component } from 'react';
import LoginForm from '../sections/Defaultlogin/LoginForm';

class Login extends Component {
    render() {
        return (
            <div className="ms-body ms-primary-theme ms-logged-out">
                <main className="body-content">
                    <LoginForm/>
                </main>
            </div>
        );
    }
}
export default Login;