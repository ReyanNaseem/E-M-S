import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as yup from 'yup';
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { HiRefresh } from 'react-icons/hi';
import { CustomLoaderButton } from '../components/CustomLoaderButton';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../utils/axiosClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useMainContext } from '../context/mainContext';

export const LoginPage = () => {

  const [toggel, setToggel] = useState(false);
  const [captcha, setcaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {fetchUserProfile} = useMainContext()
  const initialValues = {
    email: '',
    password: '',
    captcha: ''
  }

  const validationSchema = yup.object({
    email: yup.string().email('Email must be valid').required('Email is required'),
    password: yup.string().required('Password is required'),
    captcha: yup.string().required('Captcha is required')
  })

  const onSubmitHandler = async(values, helpers)=>{
    try {
      setLoading(true)
      // validate captcha
      if(values.captcha != eval(captcha)){
        toast.error('Enter Valid Captcha')
        return
      }
      delete values.captcha
      
      const response = await axiosClient.post('/login', values)
      const data = await response.data;
      localStorage.setItem('token',data.token)
      toast.success(data.message)
      await fetchUserProfile()
      helpers.resetForm()
      navigate('/')
            
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  }

  let captchaOperators = ["+", "-"];
  const generateCaptcha = () => {

    let str = `${Math.floor(Math.random() * 100)}${
      captchaOperators[Math.floor(Math.random() * captchaOperators.length)]
    }${Math.floor(Math.random() * 100)}`;

    setcaptcha(str)
  };

  useEffect(()=>{
    generateCaptcha()
  }, [])

  return (
    <>
      <Navbar/>
      <div className="min-h-[70vh] flex items-center justify-center flex-col py-10">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
        >

          <Form className="w-[98%] md:w-1/2 lg:w-1/3 border-[2px] py-10 px-4 rounded border-gray-400 ">

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full py-2 border border-gray-500 rounded px-3 outline-none placeholder:font-pmedium"
                placeholder="Enter your Email"
              />
              <ErrorMessage
                name="email"
                className="text-red-500 text-xs"
                component={"p"}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <div className="flex w-full border border-gray-500 rounded items-center justify-between px-4">
                <Field
                  type={toggel ? "text" : "password"}
                  name="password"
                  className="w-full py-2 outline-none placeholder:font-pmedium"
                  placeholder="Enter your Password"
                />
                <button
                  onClick={() => setToggel(!toggel)}
                  type="button"
                  className="text-gray-400 text-2xl"
                >
                  {toggel ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                className="text-red-500 text-xs"
                component={"p"}
              />
            </div>

            <div className="flex mb-3 items-center justify-between">
              <p className="text-center w-1/2">{captcha}</p>
              <button onClick={generateCaptcha} type='button' className="text-center w-1/2">
                <HiRefresh />
              </button>
              <div className="flex flex-col w-full">
                <Field
                  name="captcha"
                  className="w-full py-2 border border-gray-500 font-pbold rounded px-3 outline-none placeholder:font-pmedium"
                  placeholder="Enter your Captcha"
                />
                <ErrorMessage
                  name="captcha"
                  className="text-red-500 text-xs"
                  component={"p"}
                />
              </div>
            </div>

            <div className="mb-3">
            <CustomLoaderButton isLoading={loading} text='Login'/>
            </div>

            <div className="mb-3">
              <p className="text-center">Don't have an account ? <Link to={'/signup'} className='font-psmbold text-indigo-500'>Signup</Link></p>
            </div>

          </Form>

        </Formik>
      </div>
      <Footer/>
    </>
  );
}
