import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return(
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={'404 not found'}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
