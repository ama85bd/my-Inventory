import React from 'react';
import { Services } from './constant/Services';
import Image from 'next/image';

const MainHomePage = () => {
  return (
    <main className='relative flex flex-col lg:flex-row bg-pattern bg-cover bg-top bg-dark-100'>
      <div className='w-full  lg:w-1/3 lg:h-screen flex justify-center items-center'>
        <Image
          src='/icons/3.jpg'
          alt='logo'
          className='w-full h-auto object-cover'
          width={500}
          height={200}
        />
      </div>

      <section className=' relative my-auto flex  min-h-96 lg:min-h-screen flex-1 items-center  py-10 '>
        <div className='flex lg:hidden absolute left:0 lg:right-0 top-30 h-16 w-1/3 xs:w-1/2 bg-white clip-arrow px-1 xs:px-3 items-center'>
          <h1 className='absolute text-sm xs:text-base font-semibold text-black'>
            All-in-One Business Solution
          </h1>
        </div>
        <div className='hidden lg:flex absolute right-0 top-20 h-24 w-2/3 lg:w-2/3 bg-white clip-arrow-md px-4 items-center'>
          <h1 className='absolute right-2 lg:right-5 text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold text-black'>
            All-in-One Business Solution
          </h1>
        </div>

        <ul className='absolute right-2 lg:right-5 space-y-2 mt-0 md:mt-5'>
          {Services.map((item, idx) => (
            <li
              key={idx}
              className='flex items-start gap-3 text-white text-base md:text-3xl'
            >
              <span className='mt-2 md:mt-4 h-2 w-2 rounded-full bg-white'></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default MainHomePage;
