import React from 'react'
import { LoginPage } from '../pages/LoginPage'
import { Navigate, Outlet } from 'react-router-dom'

const IsLogin = () => {
    const token = !!localStorage.getItem('token')
  return (
    <div>
        {
            token?<Navigate to={'/'} />:<Outlet/>
        }
    </div>
  )
}

export default IsLogin