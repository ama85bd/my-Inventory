'use client';
import React from 'react';
import CardPopularProducts from './CardPopularProducts';
import CardPurchaseSummary from './CardPurchaseSummary';
import CardSalesSummary from './CardSalesSummary';
import CardExpenseSummary from './CardExpenseSummary';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows'>
      {/* <div className='row-span-3 xl:row-span-6 bg-gray-500' /> */}
      <CardPopularProducts />
      {/* <div className='row-span-3 xl:row-span-6 bg-blue-500' /> */}
      <CardSalesSummary />
      {/* <div className='row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-red-500' /> */}
      <CardPurchaseSummary />
      {/* <div className='row-span-3 bg-orange-500' /> */}
      <CardExpenseSummary />
      <div className='md:row-span-1 xl:row-span-2 bg-purple-500' />
      <div className='md:row-span-1 xl:row-span-2 bg-purple-500' />
      <div className='md:row-span-1 xl:row-span-2 bg-purple-500' />
    </div>
  );
};

export default Dashboard;
