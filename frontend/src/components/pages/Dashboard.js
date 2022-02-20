import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import HomeContent from '../sections/Dashboard/HomeContent';

class Dashboard extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <HomeContent/>
                </main>
            </div>
        );
    }
}

export default Dashboard;