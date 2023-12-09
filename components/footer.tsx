import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full max-w[1200] border border-solid border-[#E1E2E4] flex justify-between pt-[20px] pb-[20px] pl-[16px] pr-[16px] mt-[165px] lg:flex-col '>
        <div className='font-inter text-base font-normal leading-[22px] tracking-[0.08px] text-[#4A4F5C] w-full md:max-w-[300px]  md:overflow-hidden md:whitespace-nowrap sm:overflow-hidden sm:whitespace-nowrap'>https://github.com/SenaNur3/CreateTaskWebApp.git</div>
        <div className='font-inter text-base font-normal leading-[22px] tracking-[0.08px] text-[#4A4F5C] lg:mt-[10px]'>Sena Nur Ertürk</div>
    </footer>
  )
}

export default Footer