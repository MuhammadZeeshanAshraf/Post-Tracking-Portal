import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Preloader from './components/layouts/Preloader';
// import Dashboard from './components/pages/Dashboard';
// import Accordions from './components/pages/Accordions';
// import Addproduct from './components/pages/Addproduct';
// import Alerts from './components/pages/Alerts';
// import Animations from './components/pages/Animations';
// import Badges from './components/pages/Badges';
// import Basictables from './components/pages/Basictables';
// import Breadcrumbs from './components/pages/Breadcrumbs';
// import Buttons from './components/pages/Buttons';
// import Cards from './components/pages/Cards';
// import Chartjs from './components/pages/Chartjs';
// import Chat from './components/pages/Chat';
// import Cropper from './components/pages/Cropper';
// import Customerlist from './components/pages/Customerlist';
// import Customerreview from './components/pages/Customerreview';
// import Datatables from './components/pages/Datatables';
// import Draggables from './components/pages/Draggables';
// import Email from './components/pages/Email';
// import Flaticons from './components/pages/Flaticons';
// import Fontawesome from './components/pages/Fontawesome';
// import Formelements from './components/pages/Formelements';
// import Formlayouts from './components/pages/Formlayouts';
// import Formvalidation from './components/pages/Formvalidation';
// import Formwizard from './components/pages/Formwizard';
// import Googlemaps from './components/pages/Googlemaps';
// import Invoicedetail from './components/pages/Invoicedetail';
// import Invoicelist from './components/pages/Invoicelist';
// import Materialize from './components/pages/Materialize';
// import Menucatalogue from './components/pages/Menucatalogue';
// import Menugrid from './components/pages/Menugrid';
// import Menulist from './components/pages/Menulist';
// import Modals from './components/pages/Modals';
// import Googlechart from './components/pages/Googlechart';
// import Orders from './components/pages/Orders';
// import Pagination from './components/pages/Pagination';
// import Preloaders from './components/pages/Preloaders';
// import Productdetail from './components/pages/Productdetail';
// import Progressbars from './components/pages/Progressbars';
// import Rangeslider from './components/pages/Rangeslider';
// import Rating from './components/pages/Rating';
// import Restaurantlist from './components/pages/Restaurantlist';
// import Sales from './components/pages/Sales';
// import Sliders from './components/pages/Sliders';
// import Socialactivity from './components/pages/Socialactivity';
// import Sweetalerts from './components/pages/Sweetalerts';
// import Tabs from './components/pages/Tabs';
// import Toast from './components/pages/Toast';
// import Todolist from './components/pages/Todolist';
// import Tour from './components/pages/Tour';
// import Typography from './components/pages/Typography';
// import Vectormaps from './components/pages/Vectormaps';
// import Widgets from './components/pages/Widgets';
// import Clientmanagement from './components/pages/Clientmanagement';
// import Comingsoon from './components/pages/Comingsoon';
// import Defaultlogin from './components/pages/Defaultlogin';
import Registration from './components/pages/Registration';
import Otp from './components/pages/Otp';

// import Error from './components/pages/Error';
// import Faq from './components/pages/Faq';
// import Invoice from './components/pages/Invoice';
// import Lockscreen from './components/pages/Lockscreen';
// import Modallogin from './components/pages/Modallogin';
// import Modalregister from './components/pages/Modalregister';
// import Portfolio from './components/pages/Portfolio';
// import Stockmanagement from './components/pages/Stockmanagement';
// import Userprofile from './components/pages/Userprofile';
// import Webanalytics from './components/pages/Webanalytics';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import AddEditRole from './components/pages/AddEditRole';
import Staff from './components/pages/Staff';
import UserLoginRecords from './components/pages/UserLoginRecords';
import UploadedRecords from './components/pages/UploadedRecords';
import ShipmentWiseRecord from './components/pages/ShipmentWiseRecord';
import TrackingIssues from './components/pages/TrackingIssues';
import PlatformNotFound from './components/pages/PlatformNotFound';
import ComingSoon from './components/pages/ComingSoon';


function App() {
  return (
    <Router basename={'/'}>
      <Preloader/>
      <Switch>
        <Route path="/register" component={Registration} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
      <Switch>
        <Route path="/register" component={Registration} />
        <Route path="/default-register" component={Registration} />
      </Switch>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/default-register" component={Login} />
      </Switch>
      <Switch>
        <Route path="/addEditRole" component={AddEditRole} />
        <Route path="/addEditRole" component={AddEditRole} />
      </Switch>
      <Switch>
        <Route path="/staff" component={Staff} />
        <Route path="/staff" component={Staff} />
      </Switch>
      <Switch>
        <Route path="/otp" component={Otp} />
        <Route path="/otp" component={Otp} />
      </Switch>
      <Switch>
        <Route path="/uploadedRecords" component={UploadedRecords} />
      </Switch>
      <Switch>
        <Route path="/shipmentWiseRecord" component={ShipmentWiseRecord} />
      </Switch>
      <Switch>
        <Route path="/trackingIssues" component={TrackingIssues} />
      </Switch>
      <Switch>
        <Route path="/platformNotFound" component={PlatformNotFound} />
      </Switch>
      <Switch>
        <Route path="/userLoginRecords" component={UserLoginRecords} />
      </Switch>
      <Switch>
        <Route path="/comingSoon" component={ComingSoon} />
      </Switch>
    </Router>
  );
}

export default App;
