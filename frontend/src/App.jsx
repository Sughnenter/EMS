import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <register/>
}

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterAndLogout />} />
        <Route path='/logout' element={<Logout />} /> 
      </Routes>
          </BrowserRouter>
  )
}

export default App
