import React from 'react'
import { LoginPage } from '../pages/LoginPage'
import { Navigate } from 'react-router-dom'

const IsLogin = () => {
    const token = !!localStorage.getItem('token')
  return (
    <div>
        {
            token?<Navigate to={'/'} />:<LoginPage/>
        }
    </div>
  )
}

export default IsLogin