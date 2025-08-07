import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AuthRoutes from './routes/AuthRoutes'
import IsLogin from './routes/IsLogin'

function App() {

  return(
    <div>

      <Routes>
        <Route element={<IsLogin/>}>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Route>

        {/* SECURE ROUTES */}
        <Route element={<AuthRoutes/>}>
          <Route path='/' element={<Dashboard/>}/>
        </Route>
        
        <Route path='*' element={'404 not found'}/>
      </Routes>

    </div>
  )
}

export default App
