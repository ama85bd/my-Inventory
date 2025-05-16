import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CommonNavbar = () => {
  return (
    <div className='flex justify-between items-center bg-gray-50  '>
      <Link
        href='/'
        className={`flex gap-3 justify-between md:justify-normal items-center p-4 ${'px-4'}`}
      >
        <Image
          src='/icons/header-logo.png'
          alt='MYFINWAY-logo'
          width={50}
          height={50}
          className={`rounded ${'w-20  h-[30px] '}mt-0`}
        />
        <h1 className={`hidden md:flex font-extrabold text-2xl`}>MYFINWAY</h1>
      </Link>
      <div className='flex justify-between items-center gap-5  text-lg pr-3'>
        <Link
          href='/sign-in'
          className='font-bold  hover:!text-gray-700 hover:underline underline-offset-4 decoration-[2px]  transition duration-200'
        >
          SIGN IN
        </Link>
        <Link
          href='/sign-up'
          className='font-bold  hover:!text-gray-700 hover:underline underline-offset-4  decoration-[2px] transition duration-200'
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default CommonNavbar;
