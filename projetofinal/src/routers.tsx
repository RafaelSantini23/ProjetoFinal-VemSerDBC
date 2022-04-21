import { useEffect } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import api from './api';
import Header from './components/header/Header';
import { AuthDTO } from './models/AuthDTO';
import CreateCampanhas from './pages/createCampanhas/CreateCampanhas';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { RootState } from './store';
import { isAuth } from './store/actions/AuthAction';

function Routers({auth, dispatch}: AuthDTO & DispatchProp) {

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      api.defaults.headers.common['Authorization'] = token;
      isAuth(dispatch)
    }
  }, [])

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-campanhas" element={<CreateCampanhas />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state: RootState) => ({
  auth: state.AuthReducer.auth  
})


export default connect(mapStateToProps)(Routers);
