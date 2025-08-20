import React from 'react'

const Footer = () => {
  return (
    <div className='h-16 w-full bg-[#313131] text-white flex items-center justify-center'>
      <p className='text-center'>Reyan@<span className='font-psmbold'>{new Date().getFullYear()}</span></p>
    </div>
  )
}

export default Footer