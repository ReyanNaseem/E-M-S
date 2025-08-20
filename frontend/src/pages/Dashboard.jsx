import React from 'react'
import Layout from './Layout'
import { FaUsersLine } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { AuthSlicePath } from '../redux/slice/auth.slice'

const Dashboard = () => {
  const  authUser = useSelector(AuthSlicePath)
  return (
    <Layout>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-10'>
          <div className="w-full py-3 px-3 flex justify-between items-start bg-[#374151] rounded-md text-white">
            <FaUsersLine className='text-5xl'/>
            <div className="flex flex-col">
              <p className="text-xl font-pmedium">Total Employees</p>
              <p className="text-end font-pbold">{authUser && authUser.total_emp}</p>
            </div>
          </div>          
        </div>
    </Layout>
  )
}

export default Dashboard