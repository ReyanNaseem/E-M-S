import React from 'react'
import LogoContainer from './LogoContainer'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const token = !!localStorage.getItem('token');
  
  return (
    <>
    <header className='w-full shadow'>
        <div className='w-[96%] lg:w-[80%] container mx-auto py-4 flex items-center justify-between'>
            <LogoContainer/>
            <ul className='flex items-center justify-center gap-x-3'>
              <li>
                <Link to={'/'} className='font-pmedium'>Dashboard</Link>
              </li>
              <li>
                <Link to={'/login'} className={`${token?'hidden':'block'} font-pmedium px-4 py-2 bg-indigo-500 text-white outline-none border rounded`}>Login</Link>
              </li>
              <li>
                <Link to={'/signup'} className={`${token?'hidden':'block'} font-pmedium px-4 py-2 bg-red-500 text-white outline-none border rounded`}>Signup</Link>
              </li>
              <li>
                <Link onClick={()=>localStorage.removeItem('token')} to={'/login'} className={`${token?'block':'hidden'} font-pmedium px-4 py-2 bg-red-500 text-white outline-none border rounded`}>Logout</Link>
              </li>
            </ul>
        </div>
    </header>
    </>
  )
}

export default Navbar