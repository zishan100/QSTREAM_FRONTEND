import { Navigate, Outlet } from 'react-router-dom'


export default function ProtectedRoute() {

  let userToken = localStorage.getItem('userToken');

  if (!userToken) {
    return <Navigate to='/' replace />
  }
  return (<Outlet />)
}