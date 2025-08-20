import React from 'react'
import { Link } from 'react-router-dom'

const EmpCard = ({data, onDelete}) => {
  return (
    <>
        <tr className='text-white'>
            <td className='px-2 border-b text-center font-bold border-r'>{data.empId}</td>
            <td className='px-2 border-b text-center border-r'>{data.name}</td>
            <td className='px-2 border-b text-center border-r'>{data.email}</td>
            <td className='py-1 px-2 border-b border-r'>
              <img src={data.image} className='w-12 h-12 mx-auto rounded-full' />
            </td>
            <td className='text-center border-b'>
              <button onClick={()=>onDelete(data._id)} className='w-16 mx-2 text-white rounded bg-red-500'>Delete</button>
              <button className='w-16 mx-2 text-white rounded bg-green-500'><Link to={'/update-employee/'+data._id}>Edit</Link></button>
            </td>

        </tr>
    </>
  )
}

export default EmpCard