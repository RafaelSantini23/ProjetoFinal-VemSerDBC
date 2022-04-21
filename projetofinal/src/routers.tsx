import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
