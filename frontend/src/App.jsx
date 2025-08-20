import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AuthRoutes from './routes/AuthRoutes'
import IsLogin from './routes/IsLogin'
import AddEmployee from './pages/AddEmployee'
import AllEmployee from './pages/AllEmployee'
import UpdateEmployee from './pages/UpdateEmployee'

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
          <Route path='/add-employee' element={<AddEmployee/>}/>
          <Route path='/all-employee' element={<AllEmployee/>}/>
          <Route path='/update-employee/:id' element={<UpdateEmployee/>}/>
        </Route>
        
        <Route path='*' element={<h1>404 not found</h1>}/>
      </Routes>

    </div>
  )
}

export default App
