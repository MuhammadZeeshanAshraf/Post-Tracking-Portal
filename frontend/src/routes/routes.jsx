import { lazy } from 'react';
import AddEditRole from '../components/pages/AddEditRole';
import ClearStorage from '../components/pages/ClearStorage';
import ComingSoon from '../components/pages/ComingSoon';
import Customer from '../components/pages/Customer';
import Dashboard from '../components/pages/Dashboard';
import PlatformNotFound from '../components/pages/PlatformNotFound';
import ShipmentWiseRecord from '../components/pages/ShipmentWiseRecord';
import Staff from '../components/pages/Staff';
import TrackingIssues from '../components/pages/TrackingIssues';
import UploadedRecords from '../components/pages/UploadedRecords';
import UploadFile from '../components/pages/UploadFile';
import UserDocumentRecords from '../components/pages/UserDocumentRecords';
import UserLoginRecords from '../components/pages/UserLoginRecords';
import UserProfile from '../components/pages/UserProfile';

const routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    exact: true
  },
  {
    path: 'roles',
    component: AddEditRole,
    exact: true
  },
  {
    path: 'staff',
    component: Staff,
    exact: true
  },
  {
    path: 'processTrackings',
    component: UploadFile,
    exact: true
  },
  {
    path: 'shipmentWiseRecord',
    component: ShipmentWiseRecord,
    exact: true
  },
  {
    path: 'uploadedRecords',
    component: UploadedRecords,
    exact: true
  },
  {
    path: 'trackingIssues',
    component: TrackingIssues,
    exact: true
  },
  {
    path: 'platformNotFound',
    component: PlatformNotFound,
    exact: true
  },
  {
    path: 'customer',
    component: Customer,
    exact: true
  },
  {
    path: 'userLoginRecords',
    component: UserLoginRecords,
    exact: true
  },
  {
    path: 'clearStorage',
    component: ClearStorage,
    exact: true
  },
  {
    path: 'userDocumentRecords',
    component: UserDocumentRecords,
    exact: true
  },
  {
    path: 'profile',
    component: UserProfile,
    exact: true
  },
  {
    path: 'comingSoon',
    component: ComingSoon,
    exact: true
  }
];

export default routes;
