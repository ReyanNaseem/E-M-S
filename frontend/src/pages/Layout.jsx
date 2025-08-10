import React, { use } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useLocation } from 'react-router-dom'
import {MdDashboard} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
import {FaUsersLine} from 'react-icons/fa6'
import clsx from 'clsx'

const sidebarItemList = [
    {
      name: 'Dashboard',
      link: '/',
      Icon: MdDashboard
    },
    {
      name: 'Add Employee',
      link: '/add-employee',
      Icon: FaUser
    },
    {
      name: 'All Employee',
      link: '/all-employee',
      Icon: FaUsersLine
    }
  ]
const Layout = ({children}) => {
  const {pathname} = useLocation();
  return (
    <div className='min-h-[100vh]'>
      <Navbar/>
      <div className='flex w-[90%] mx-auto items-start flex-col lg:flex-row py-10 gap-x-1'>
        <div className="w-1/4 hidden lg:flex flex-col h-screen bg-gray-200 ">
          {
            sidebarItemList.map((curr, i)=>{
              return (
              <Link to={curr.link} key={i} className={clsx('w-full py-3 px-3 flex justify-start gap-x-3 items-center','hover:bg-gray-300 rounded',curr.link ===pathname&&'bg-gray-300')}>
                  <curr.Icon className='text-2xl'/>
                  <span>{curr.name}</span>
              </Link>)
            })
          }
        </div>

        <ul className="flex lg:hidden items-center gap-x-3">
          {
           
            sidebarItemList.map((curr, i)=>{
              return <li key={i} className={clsx('bg-gray-200 flex gap-x-1 items-center px-5 py-1 rounded-full','hover:bg-gray-300 rounded',curr.link ===pathname&&'bg-gray-300')}>
                <curr.Icon className='text-lg'/>
                <Link to={curr.link}>{curr.name}</Link>
              </li>
            })
          }
        </ul>

        <section className='w-full'>
          {children}
        </section>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;