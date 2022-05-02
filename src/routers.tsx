import { useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthDTO } from './models/AuthDTO';
import { RootState } from './store';
import { isAuth } from './store/actions/authAction';
import api from './api';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import Details from './pages/details/Details';
import Register from './pages/register/Register';
import NotFound from './pages/notfound/NotFound';
import PrivateRoute from './privateRoute';
import CreateCampanhas from './pages/createCampanhas/CreateCampaign';

function Routers({ auth, dispatch }: AuthDTO & DispatchProp) {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = token;
      isAuth(dispatch, auth)
    }

  }, [])


  return (
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path="*" element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
        />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaigns" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/create-campaigns" element={
          <PrivateRoute>
            <CreateCampanhas />
          </PrivateRoute>
        } />
        <Route path="/details" element={
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        }>
          <Route path=":id" element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: RootState) => ({
  auth: state.authReducer.auth
})


export default connect(mapStateToProps)(Routers);
