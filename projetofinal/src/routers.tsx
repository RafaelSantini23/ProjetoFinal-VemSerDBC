import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
