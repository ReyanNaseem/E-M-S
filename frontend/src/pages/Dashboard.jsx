import React from 'react'
import Layout from './Layout'
import { FaUsersLine } from 'react-icons/fa6'

const Dashboard = () => {
  return (
    <Layout>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-10'>
          <div className="w-full border py-3 px-3 flex justify-between items-start border-gray-300 rounded">
            <FaUsersLine className='text-5xl'/>
            <div className="flex flex-col">
              <p className="text-xl font-pmedium">Total Employees</p>
              <p className="text-end font-pbold">45</p>
            </div>
          </div>          
        </div>
    </Layout>
  )
}

export default Dashboard