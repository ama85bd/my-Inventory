'use client';
import React, { useEffect } from 'react';
import Sidebar from '../(Components)/Sidebar';
import StoreProvider, { useAppSelector } from '../redux';
import { Session } from 'next-auth';

const DashboardLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  console.log('session dash', session);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);
  return (
    <div
      className={`${isDarkMode ? 'dark' : 'light'} 
      
      flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      {session && <Sidebar />}
      <main
        className={`flex flex-col w-full h-full ${
          session && 'py-7 px-9'
        } bg-gray-50 
          ${session && (isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72')}
        `}
      >
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <StoreProvider>
      <DashboardLayout session={session}>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
