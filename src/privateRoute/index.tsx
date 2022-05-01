import { Navigate } from "react-router-dom";
import api from "../api";


export default function PrivateRoute({ children }: any) {
  const token = localStorage.getItem('token')
  if (token) {
    api.defaults.headers.common['Authorization'] = token
  }
 
  return token ? children : <Navigate to="/" />;

}