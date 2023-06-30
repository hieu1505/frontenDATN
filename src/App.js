import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import ForgetPassword from "./page/ForgetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListAccount from "./page/ListAccount";
import { Navigate, Outlet } from 'react-router-dom';
import Acountupdate from "./page/Acount/Acountupdate";
import ProfileInfo from "./page/ProfileInfo";
import CreateAccount from "./page/Acount/CreateAccount";
import ChangePassword from "./page/ChangePassword";
import UploadAcount from "./page/Acount/UploadAcount";
import ListCenter from "./page/Center/ListCenter";
import UpdateCenter from "./page/Center/UpdateCenter";
import jwt from 'jwt-decode';
import HomeCenter from "./page/Center/HomeCenter";
import ListChildren from "./page/Children/ListChildren";
import CreateChildren from "./page/Children/CreateChildren";
import UpdateChildren from "./page/Children/UpdateChildren";
import CreateCenter from "./page/Center/CreateCenter";
import Activity from "./page/activity/Activity";
import ListActivity from "./page/activity/ListActivity";
import UploadActivity from "./page/activity/UploadActivity";
import ActivityDetail from "./page/activity/ActivityDetail";
import RevenueManagement from "./page/RevenueManagement/revenueManagement";
import Dashboar from "./page/Dashboard";
import AdropDetail from "./page/AdropDetail";
import ListAdrop_request from "./page/ListAdrop_request";
function App() {
  return (
    <>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route element={<UnauthenticatedGuard />}>
            <Route path='/forgetPassword' element={<ForgetPassword />}>
            </Route>
            <Route path='/register' element={<Register />}>
            </Route>
            <Route path='/login' element={<Login />}>
            </Route>
          </Route>
          <Route element={<AuthenticatedGuard />}>
            <Route element={<IsCenter/>}>
            <Route path='/admin' element={<Home />} >
              <Route path='changepassword' element={<ChangePassword />} />
              <Route path='acountupdate' element={<Acountupdate />} />
              <Route path='createaccount' element={<CreateAccount />} />
              <Route path='uploadAcount/:id' element={<UploadAcount />} />
              <Route path='updateCenter/:id' element={<UpdateCenter />} />
              <Route path='createCenter' element={<CreateCenter />} />
              
              <Route path='listCenter' element={<ListCenter />} />
              <Route path='listAccount' element={<ListAccount />} />
              <Route path='profileinfo' element={<ProfileInfo />} />
            </Route>
            </Route>
            <Route element={<IsAdmin/>}>
            <Route path='/center' element={<HomeCenter />} >
              {/* {/* <Route path='/changepassword' element={<ChangePassword />} />
              <Route path='/acountupdate' element={<Acountupdate />} />
              <Route path='/createaccount' element={<CreateAccount />} />
              <Route path='/uploadAcount/:id' element={<UploadAcount />} />
              <Route path='/updateCenter/:id' element={<UpdateCenter />} />
              <Route path='/listCenter' element={<ListCenter />} />
              <Route path='/listAccount' element={<ListAccount />} /> */}
              <Route path='profileinfo' element={<ProfileInfo />} /> 
              <Route path='listChildren/:id' element={<ListChildren />} />
              <Route path='changepassword' element={<ChangePassword />} />
              <Route path='updateCenter/:id' element={<UpdateCenter />} />
              <Route path='createchildren/:id' element={<CreateChildren />} />
              <Route path='updateChildren/:id' element={<UpdateChildren />} />
              <Route path='createactivity/:id' element={<Activity />} />
              <Route path='listActivity/:id' element={<ListActivity />} />
              <Route path='uploadActivity/:id' element={<UploadActivity />} />
              <Route path='activityDetail/:id' element={<ActivityDetail />} />
              <Route path='revenueManagement/:id' element={<RevenueManagement />} />
            
              <Route path='Dashboar' element={<Dashboar />} />
              <Route path='AdropDetail/:id' element={<AdropDetail />} />
              <Route path='ListAdrop_request/:id' element={<ListAdrop_request />} />

              
              







            </Route>
            </Route>
            
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
function AuthenticatedGuard() {
  const authenticated = localStorage.getItem('access_token')
  if (!authenticated) return <Navigate to={'/login'} />
  return (
    <>
      <Outlet />
    </>
  )
}
function UnauthenticatedGuard() {
  const authenticated = localStorage.getItem('access_token')
  if (authenticated) return <Navigate to={'admin'} />
  return (
    <>
      <Outlet />
    </>
  )
}
function IsAdmin() {
  const authenticated = localStorage.getItem('access_token')
  const account = jwt(authenticated)
  console.log(account)
  if (account.role_name!=='center') return <Navigate to={'admin'} />
  return (
    <>
      <Outlet />
    </>
  )
}
function IsCenter() {
  const authenticated = localStorage.getItem('access_token')
  const account = jwt(authenticated)
  console.log(account)
   if (account.role_name==='center') return <Navigate to={'center'} />
  return (
    <>
      <Outlet />
    </>
  )
}