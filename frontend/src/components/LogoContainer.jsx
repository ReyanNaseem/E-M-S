import React from 'react'
import { Link } from 'react-router-dom'

const LogoContainer = () => {
  return (
    <div>
      <Link to={'/'} className='flex items-center gap-x-1 text-2xl font-pbold'>
        <span>EMP</span> <span className='w-3 h-3 animate-bounce bg-red-500 rounded-full'></span>
        
      </Link>
    </div>
  )
}

export default LogoContainer