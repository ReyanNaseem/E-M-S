import React from 'react'
import LogoContainer from './LogoContainer'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AuthSlicePath } from '../redux/slice/auth.slice';
import { toast } from 'react-toastify';
import { useMainContext } from '../context/mainContext';

const Navbar = () => {
  const user = useSelector(AuthSlicePath)
  const {logoutHandler} = useMainContext()
  

  return (
    <>
    <header className='w-full shadow'>
        <div className='w-[96%] lg:w-[80%] container mx-auto py-4 flex items-center justify-between'>
            <LogoContainer/>
            <ul className='flex items-center justify-center gap-x-3'>
              <li>
                <Link to={'/'} className='font-pmedium'>Dashboard</Link>
              </li>
              {!user?<>
              <li>
                <Link to={'/login'} className={`font-pmedium px-4 py-2 bg-indigo-500 text-white outline-none border rounded`}>Login</Link>
              </li>
              <li>
                <Link to={'/signup'} className={`font-pmedium px-4 py-2 bg-red-500 text-white outline-none border rounded`}>Signup</Link>
              </li>
              </>:
              <li>
                <Link onClick={logoutHandler} to={'/login'} className={`font-pmedium px-4 py-2 bg-red-500 text-white outline-none border rounded`}>Logout</Link>
              </li>}
            </ul>
        </div>
    </header>
    </>
  )
}

export default Navbar