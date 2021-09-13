import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Feedbacks from './components/Feedbacks/Feedbacks';
import Connect from './components/Connect/Connect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import ServiceList from './components/ServiceList/ServiceList';
import Reviews from './components/Reviews/Reviews';
import AddAdmin from './components/AddAdmin/AddAdmin';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminPrivate from './components/AdminPrivate/AdminPrivate';
import HandleReviews from './components/handleReviews/HandleReviews';
import HandleConnects from './components/HandleConnects/HandleConnects';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path="/placeOrder">
          <PlaceOrder></PlaceOrder>
        </PrivateRoute>
        <PrivateRoute path="/serviceList">
          <ServiceList></ServiceList>
        </PrivateRoute>
        <PrivateRoute path="/review">
          <Reviews></Reviews>
        </PrivateRoute>
        <Route path="/admin">
          <AdminLogin></AdminLogin>
        </Route>
        <AdminPrivate path="/addAdmin">
          <AddAdmin></AddAdmin>
        </AdminPrivate>
        <AdminPrivate path="/handleReviews">
          <HandleReviews></HandleReviews>
        </AdminPrivate>
        <AdminPrivate path="/handleConnects">
          <HandleConnects></HandleConnects>
        </AdminPrivate>
        <Route path="/">
          <Header></Header>
          <Services></Services>
          <Portfolio></Portfolio>
          <Feedbacks></Feedbacks>
          <Connect></Connect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
