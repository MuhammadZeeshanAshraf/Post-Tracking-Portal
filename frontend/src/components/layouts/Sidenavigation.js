import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import logo from '../../assets/img/costic/costic-logo-216x62.png';

class Sidenavigation extends Component {

    removeoverlay = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }
    componentDidMount() {
        function setActiveMenuItem() {
            $('.ms-main-aside .menu-item>a').on('click', function () {
                $(this).removeAttr('href');
                var element = $(this).parent('li');
                if (element.hasClass('active')) {
                    element.removeClass('active');
                    element.find('li').removeClass('active');
                    element.find('.collapse').slideUp();
                } else {
                    element.addClass('active');
                    element.children('.collapse').slideDown();
                    element.siblings('li').children('.collapse').slideUp();
                    element.siblings('li').removeClass('active');
                    element.siblings('li').find('li').removeClass('active');
                    element.siblings('li').find('.collapse').slideUp();
                }
            });
        }
        setActiveMenuItem();
    }
    render() {
        return (
            <div>
                <div className="ms-aside-overlay ms-overlay-left ms-toggler" onClick={this.removeoverlay}></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler"></div>
                <Scrollbar id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
                    {/* Logo */}
                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {/* Navigation */}
                    <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
                        {/* Dashboard */}
                        <li className="menu-item">
                            <Link to="/dashboard"> <span><i className="material-icons fs-16" >dashboard</i>Dashboard </span></Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/uploadFile"> <span><i className="fa fa-tasks fs-16" ></i>Process Trackings</span></Link>
                        </li>
                        {/* Records */}
                        <li className="menu-item">
                            <Link to="#" className="has-chevron"> <span><i className="fa fa-archive fs-16" />Records </span>
                            </Link>
                            <ul id="record" className="collapse" aria-labelledby="record" data-parent="#side-nav-accordion">
                                <li> <Link to="/uploadedRecords" >Uploaded Records</Link>
                                </li>
                                <li> <Link to="/shipmentWiseRecord" >Shipment Wise Records</Link>
                                </li>
                                <li> <Link to="/trackingIssues" >Tracking Issues</Link>
                                </li>
                                <li> <Link to="/platformNotFound" >Platform Not found</Link>
                                </li >
                            </ul >
                        </li >
                         <li className="menu-item">
                            <Link to="/comingSoon"> <span><i className="material-icons md-24" >redeem</i>Category</span>
                            </Link>
                        </li >
                        <li className="menu-item">
                            <Link to="/comingSoon"> <span><i className="fas fa-clipboard-list fs-16" />Order</span>
                            </Link>
                        </li >
                        <li className="menu-item">
                            <Link to="/comingSoon"> <span><i className="material-icons md-36" >redeem</i>Coupun</span>
                            </Link>
                        </li >
                        <li className="menu-item">
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16" >group</i>Our Staff </span>
                            </Link>
                            <ul id="ourStaff" className="collapse" aria-labelledby="ourStaff" data-parent="#side-nav-accordion">
                                <li> <Link to="/staff" >Staff</Link>
                                </li>
                                <li> <Link to="/roles" >Roles</Link>
                                </li>
                                <li> <Link to="/userLoginRecords" >User Login Records</Link>
                                </li>
                                <li> <Link to="/userDocumentRecords" >User Documents Uploaded Records</Link>
                                </li>
                            </ul >
                        </li >
                        <li className="menu-item">
                            <Link to="/orders"> <span><i className="material-icons fs-20" >settings</i>Settings</span>
                            </Link>
                        </li >

                        {/* /Apps */}
                    </ul >
                </Scrollbar >
            </div >
        );
    }
}

export default Sidenavigation;