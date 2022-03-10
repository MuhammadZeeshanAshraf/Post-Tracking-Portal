import React, { Component } from 'react';
import ProfileModal from '../common/ProfileModal';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';

class UserProfile extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <ProfileModal/>
                </main>
            </div>
        );
    }
}

export default UserProfile;