import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axiosClient'
import EmpCard from '../components/EmpCard'

const AllEmployee = () => {
  const [employees, setEmployees] = useState([])

  const fetchAllEmployees = async()=>{
    try {
      const response = await axiosClient.get('/get-emp',{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      const data = response.data;
      setEmployees(data.data)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  }

  useEffect(()=>{
    fetchAllEmployees()
  },[])

  const deleteEmployee = async(id)=>{
    try {
      const response = await axiosClient.delete(`/delete-emp${id}`,{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      const data = await response.data;
      await fetchAllEmployees();
      toast.dismiss();
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }
  }

  return (
    <Layout>
        <div className="overflow-x-auto">
          <table className="border min-w-max w-full table-auto py-2 bg-[#374151] text-white">
            <thead>
              <tr className="bg-[#313131]">
                <th className="py-2 border-r border-b">ID</th>
                <th className="py-2 border-r border-b">Name</th>
                <th className="py-2 border-r border-b">Email</th>
                <th className="py-2 border-r border-b">Image</th>
                <th className="py-2 border-r border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees && employees.length > 0 ? (
                employees.map((curr, i) => (
                  <EmpCard key={i} data={curr} onDelete={deleteEmployee} />
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
    </Layout>
  );
}

export default AllEmployee