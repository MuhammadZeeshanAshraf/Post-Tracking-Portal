import React, { Component } from 'react';
import RegForm from '../sections/Defaultregister/RegForm';

class Registration extends Component {
    render() {
        return (
            <div className="ms-body ms-primary-theme ms-logged-out">
                {/* <Sidenavigation /> */}
                <main className="body-content">
                    {/* <Topnavigation /> */}
                    <RegForm/>
                </main>
            </div>
        );
    }
}
export default Registration;