import React, { createContext, useContext } from 'react'
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {axiosClient} from '../utils/axiosClient'
import { useEffect } from 'react';
import {removeUser, setUser} from '../redux/slice/auth.slice'
import ScreenLoaderButton from '../components/ScreenLoaderButton';
import { useNavigate } from 'react-router-dom';

const mainContext = createContext();
export const useMainContext = ()=>useContext(mainContext)

export const MainContextProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
    dispatch(removeUser())
    toast.success("Logout successfully")
  }

  const fetchUserProfile = async()=>{
    try {
      const token = localStorage.getItem('token') || '';
      if(!token)return

      const response = await axiosClient.get('/profile',{
        headers:{
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.data
      dispatch(setUser(data))

    } catch (error) {
      toast.error(error.message)  
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchUserProfile()
  },[])

  if(loading){
    return <ScreenLoaderButton/>
  }

  return (
    <mainContext.Provider value={{fetchUserProfile, logoutHandler}}>{children}</mainContext.Provider>
  )
}

export default MainContextProvider