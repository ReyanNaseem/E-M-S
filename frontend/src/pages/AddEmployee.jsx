import React from 'react'
import Layout from './Layout'
import * as yup from 'yup';
import {ErrorMessage, Field, Formik} from 'formik'
import { EmployeeRoles } from '../utils/constant'
import {CustomLoaderButton} from '../components/CustomLoaderButton'
import { toast } from 'react-toastify';

const AddEmployee = () => {

    const initialValues = {
        name:'',
        salary: 0,
        role: '',
        image: '',
        mobile: '',
        email: '',
        address: ''
    }

    const validationSchema = yup.object({
        'name':yup.string().required("Name is Required"),
        'salary':yup.string().required("Salary is Required"),
        'role':yup.string().required("Role is Required"),
        'mobile':yup.string().required("Mobile is Required"),
        'address':yup.string().required("Address is Required"),
        'email':yup.string().required("Email is Required").email("Enter valid Email"),
    })

    const onSubmitHandler = async(values, helpers)=>{
        try {
            
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

  return (
    <Layout>
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitHandler}
            validationSchema={validationSchema}
        >
            <form className='w-[90%] mx-auto py-10'>
                <div className="mb-3">
                    <label htmlFor="">Employee Name <span className="text-red-500">*</span></label>
                    <Field type="text" name='name' className='w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium' placeholder='Enter Employee Name' />
                    <ErrorMessage name='name' component={'p'} className='text-red-500 text-xs'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="">Employee Role <span className="text-red-500">*</span></label>
                    <Field as="select" name='role' className='w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium'>
                        <option>------select------</option>
                        {
                            EmployeeRoles.map((curr,i)=>{
                                return <option key={i} value={curr}>{curr}</option>
                            })
                        }
                    </Field>
                    <ErrorMessage name='role' component={'p'} className='text-red-500 text-xs'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="">Employee Salary <span className="text-red-500">*</span></label>
                    <Field type="number" name='salary' className='w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium' placeholder='Enter Employee Salary' />
                    <ErrorMessage name='salary' component={'p'} className='text-red-500 text-xs'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="">Employee Image <span className="text-red-500">*</span></label>
                    <Field type="ulr" name='image' className='w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium' placeholder='Enter Employee Image URL' />
                    <ErrorMessage name='image' component={'p'} className='text-red-500 text-xs'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="">Employee Mobile Number <span className="text-red-500">*</span></label>
                    <Field type="text" name='mobile' className='w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium' placeholder='Enter Employee Mobile Number' />
                    <ErrorMessage name='mobile' component={'p'} className='text-red-500 text-xs'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="">Employee Email <span className="text-red-500">*</span></label>
                    <Field type="email" name='email' className='w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium' placeholder='Enter Employee Email' />
                    <ErrorMessage name='email' component={'p'} className='text-red-500 text-xs'/>
                </div>

                <div className="mb-3">
                    <label htmlFor="">Employee Address <span className="text-red-500">*</span></label>
                    <Field as="textarea" rows={2} name='address' className='w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium' placeholder='Enter Employee Address' />
                    <ErrorMessage name='address' component={'p'} className='text-red-500 text-xs'/>
                </div>

                <div className="mb-3">
                    <CustomLoaderButton text='Add Employee'/>
                </div>

            </form>
        </Formik>
    </Layout>
  )
}

export default AddEmployee