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

export const SignupPage = () => {

  const [toggel, setToggel] = useState(false);
  const [captcha, setcaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    captcha: ''
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
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

      const response = await axiosClient.post('/register', values)

      const data = await response.data;

      toast.success("Success")
      helpers.resetForm()
      navigate('/login')

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
      {/* // <Navbar/> */}
      <div className="flex w-full h-[100vh]">
        <div className="w-[50%] hidden md:block">
          <img
            className="h-full w-full bg-cover"
            src="./public/homepicture.avif"
            alt=""
          />
        </div>
        <div className='md:w-[50%] w-full bg-[#313131] flex items-center justify-center'>
          <div className="w-full min-h-[70vh] flex items-center justify-center flex-col py-10">
            <h1 className='md:text-5xl text-4xl font-pbold text-[#27C4D4]'>Start managing <br /> employees <span className='text-[#E94825]'>smarter</span></h1>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmitHandler}
            >
              <Form className="w-[90%] md:w-[70%] py-10 px-4 rounded ">
                <div className="mb-3">
                  {/* <label htmlFor="name">Name</label> */}
                  <Field
                    type="text"
                    name="name"
                    className="w-full py-2 border-b text-white bg-transparent border-[#27C4D4] rounded px-3 outline-none placeholder:font-pmedium"
                    placeholder="Enter your Name"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-red-500 text-xs"
                    component={"p"}
                  />
                </div>

                <div className="mb-3">
                  {/* <label htmlFor="email">Email</label> */}
                  <Field
                    type="email"
                    name="email"
                    className="w-full py-2 border-b text-white bg-transparent border-[#27C4D4] rounded px-3 outline-none placeholder:font-pmedium"
                    placeholder="Enter your Email"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-red-500 text-xs"
                    component={"p"}
                  />
                </div>

                <div className="mb-3">
                  {/* <label htmlFor="password">Password</label> */}
                  <div className="flex w-full border-b bg-transparent border-[#27C4D4] rounded items-center justify-between px-4">
                    <Field
                      type={toggel ? "text" : "password"}
                      name="password"
                      className="w-full py-2 bg-transparent text-white outline-none placeholder:font-pmedium"
                      placeholder="Enter your Password"
                    />
                    <button
                      onClick={() => setToggel(!toggel)}
                      type="button"
                      className="text-[#27C4D4] text-2xl"
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

                <div className="flex mb-3 items-center text-white justify-between">
                  <p className="text-center w-1/2">{captcha}</p>
                  <button
                    onClick={generateCaptcha}
                    type="button"
                    className="text-center w-1/2"
                  >
                    <HiRefresh />
                  </button>
                  <div className="flex flex-col w-full">
                    <Field
                      name="captcha"
                      className="w-full py-2 border-b text-white border-[#27C4D4] bg-transparent font-pbold rounded px-3 outline-none placeholder:font-pmedium"
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
                  <CustomLoaderButton isLoading={loading} text="Signup" />
                </div>

                <div className="mb-3">
                  <p className="text-center text-white">
                    Already have an account ?{" "}
                    <Link
                      to={"/login"}
                      className="font-psmbold text-blue-300"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      {/* // <Footer/> */}
    </>
  );
}
