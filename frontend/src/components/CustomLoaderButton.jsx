import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import clsx from 'clsx'

export const CustomLoaderButton = ({
    type='submit',
    isLoading=false,
    text='',
    className=''
}) => {
  return (
    <button type={type} className={clsx(className,'w-full bg-[#E94825] disabled:bg-red-800 hover:bg-red-600 flex items-center justify-center gap-x-1 py-2 rounded text-white')}>
        <span>{text}</span>
        {
            isLoading?<CgSpinner className='text-xl animate-spin'/>:<FaArrowRight/>
        }
    </button>
  )
}
