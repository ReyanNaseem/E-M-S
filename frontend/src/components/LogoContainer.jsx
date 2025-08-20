import React from 'react'
import { Link } from 'react-router-dom'

const LogoContainer = () => {
  return (
    <div>
      <Link to={'/'} className='flex items-center'>
        {/* <span>EMP</span> <span className='w-3 h-3 animate-bounce bg-red-500 rounded-full'></span> */}
        <img className='w-16 h-16' src="./public/logo.png" alt="" />
      </Link>
    </div>
  )
}

export default LogoContainer