import React from 'react'
import Layout from './Layout'

const AllEmployee = () => {
  return (
    <Layout>
        <>
          <table className='border w-full table-auto bg-blue-50 py-10'>
            <tr >
              <th className='py-5 border-r'>ID</th>
              <th className='py-5 border-r'>Name</th>
              <th className='py-5 border-r'>Email</th>
              <th className='py-5 border-r'>Image</th>
              <th className='py-5 border-r'>Actions</th>
            </tr>
            <tbody>
              
            </tbody>
          </table>
        </>
    </Layout>
  )
}

export default AllEmployee