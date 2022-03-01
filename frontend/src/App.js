import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink
} from 'react-router-dom';
import Auth from './pages/Auth';
import ParticleBackground from './components/ParticleBackground';
import Signup from './pages/Signup';
import Home from './pages/Home';
import TimeTable from './pages/TimeTable';
import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';
import Button from './components/Button';
import AdminSignup from './pages/admin/AdminSignup';
import AdminHome from './pages/admin/AdminHome';
import StudentDetails from './pages/admin/StudentDetails';
import StaffDetails from './pages/admin/StaffDetails';

const App = () => {
  const { admin, token, _class, login, logout } = useAuth();
  const auth = useContext(AuthContext);

  const onLogout = () => {
    auth.logout();
    console.log("loggedOut");
  };
  //setting up routing to different pages
  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      isAdmin: admin,
      token: token,
      _class: _class,
      login: login,
      logout: logout
    }}>
      <ParticleBackground />
      <Router>
        <div className="app-btn-div">
          {token &&<Button inverse onClick={onLogout} to="/">LOGOUT</Button>}
          {!admin && !token && <Button inverse to="/admin/">Admin Login</Button>}
        </div>
        <div className="app-container center">
          <main>
            <Routes>
              {!token && <Route path="/" element={<Auth />} />}
              {!token && <Route path="/admin" element={<Auth />} />}
              {!token && <Route path="/signup" element={<Signup />} />}
              {token && admin && <Route path="/admin/signup" element={<AdminSignup />} />}
              {token && admin && <Route path="/admin" element={<AdminHome />} />}
              {token && admin && <Route path="/admin/studentdetails" element={<StudentDetails />} />}
              {token && admin && <Route path="/admin/staffdetails" element={<StaffDetails />} />}
              {token && admin && <Route path="" element={<NavLink to="/admin/" />} />}
              {token && <Route path="/" element={<Home />} />}
              {token && <Route path="/signup" element={<Home />} />}
              {token && <Route path="/timetable" element={<TimeTable />} />}
              {token && <Route path="/:dept/:name" element={<Home />} />}
              {<Route path="" element={<NavLink to="/" />} />}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
