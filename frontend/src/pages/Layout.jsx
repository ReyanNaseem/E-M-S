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
    <div className="min-h-screen min-w-0 w-full flex flex-col bg-white relative overflow-x-auto">
      <Navbar />
      <div className="flex flex-grow w-[90%] mx-auto items-start flex-col lg:flex-row py-2 gap-x-1">
        <div className="w-1/4 hidden lg:flex flex-col gap-2 h-screen p-2 bg-[#313131] rounded-md">
          {sidebarItemList.map((curr, i) => {
            return (
              <Link
                to={curr.link}
                key={i}
                className={clsx(
                  "w-full py-3 px-3 text-white flex justify-start gap-x-3 items-center",
                  "hover:bg-[#374151] rounded",
                  curr.link === pathname && "bg-[#374151]"
                )}
              >
                <curr.Icon className="text-2xl" />
                <span>{curr.name}</span>
              </Link>
            );
          })}
        </div>

        {/* <ul className="flex lg:hidden items-center mb-2 gap-x-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {sidebarItemList.map((curr, i) => {
            return (
              <li
                key={i}
                className={clsx(
                  "flex gap-x-1 bg-[#313131] items-center sm:px-5 px-2 py-1 text-white rounded-full flex-shrink-0",
                  "hover:bg-[#374151] rounded",
                  curr.link === pathname && "bg-[#374151]"
                )}
              >
                <curr.Icon className="text-lg" />
                <Link to={curr.link}>{curr.name}</Link>
              </li>
            );
          })}
        </ul> */}
        <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] scrollbar-hide">
          <ul className="w-max flex items-center mb-2 gap-x-1 whitespace-nowrap py-1">
            {sidebarItemList.map((curr, i) => (
              <li
                key={i}
                className={clsx(
                  "flex gap-x-1 bg-[#313131] items-center px-2 py-1 text-white rounded-full flex-none",
                  "hover:bg-[#374151] rounded",
                  curr.link === pathname && "bg-[#374151]"
                )}
              >
                <curr.Icon className="text-md" />
                <Link className="text-sm" to={curr.link}>
                  {curr.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <section className="w-full">{children}</section>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;