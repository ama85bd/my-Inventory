import React, { ReactNode } from 'react';
import Image from 'next/image';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect('/');
  return (
    <main className='auth-container'>
      <section className='auth-form'>
        <div className='auth-box text-light-100'>
          <div className='flex flex-row gap-3'>
            <Image src='/icons/logo.svg' alt='logo' width={37} height={37} />
            <h1 className='text-2xl font-semibold text-white'>BookWise</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className='relative my-auto flex h-full min-h-screen flex-1 items-center px-5 py-10 bg-gradient-to-br from-teal-800 via-teal-600 to-green-300'>
        <div className='absolute left-0 top-20 h-20 w-1/2 bg-white clip-arrow px-4 flex items-center'>
          <h1 className='text-xl font-semibold text-black'>
            All-in-One Business Solution
          </h1>
        </div>
      </section>
    </main>
  );
};

export default layout;
