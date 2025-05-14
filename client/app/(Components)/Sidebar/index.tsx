'use client';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import Image from 'next/image';
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
  Plus,
  Minus,
  ArchiveRestore,
  ContactRound,
  Box,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Apple,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { BootstrapTooltip } from '../ToolTip';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  isDropdown?: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
  isDropdown,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const [openIndex, setOpenIndex] = useState(null);

  const menuItems = [
    {
      title: 'Products',
      subItems: [
        { name: 'All Products', url: '/AllProducts', icon: Apple },
        {
          name: 'New Arrivals',
          url: '/NewArrivals',
          icon: ArrowDownNarrowWide,
        },
        { name: 'Best Sellers', url: '/BestSellers', icon: ArrowUpNarrowWide },
      ],
      Icon: ContactRound,
    },
    {
      title: 'Categories',
      subItems: [
        { name: 'Electronics', url: '/Electronics', icon: ArrowUpNarrowWide },
        { name: 'Clothing', url: '/Clothing', icon: ArrowDownNarrowWide },
        { name: 'Home & Garden', url: '/HomeGarden', icon: Apple },
      ],
      Icon: ArchiveRestore,
    },
    {
      title: 'About Us',
      subItems: [
        { name: 'Our Story', url: '/OurStory', icon: ArrowDownNarrowWide },
        { name: 'Team', url: '/Team', icon: ArrowUpNarrowWide },
        { name: 'Careers', url: '/careers', icon: Apple },
      ],
      Icon: Box,
    },
  ];

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {isDropdown ? (
        <div className='max-w-md mx-auto mt-10'>
          <ul className='space-y-2'>
            {menuItems.map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <li key={index} className='relative'>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`w-full ${
                      isCollapsed
                        ? 'justify-center py-4 ml-2'
                        : ' items-center justify-between px-8 py-4'
                    } text-left hover:text-blue-500 hover:bg-blue-100 flex  transition-colors duration-200`}
                  >
                    <div className='cursor-pointer flex items-center justify-between  gap-3'>
                      <IconComponent
                        className={`${
                          isCollapsed ? 'w-5 h-5' : 'w-6 h-6'
                        } !text-gray-700`}
                      />
                      <span className={`${isCollapsed ? 'hidden' : 'block'} `}>
                        {item.title}
                      </span>
                    </div>
                    <span
                      className={`transform transition-transform duration-200`}
                    >
                      {openIndex === index ? (
                        <Minus
                          className={`${
                            isCollapsed ? 'w-5 h-5' : 'w-6 h-6'
                          } !text-gray-700`}
                        />
                      ) : (
                        <Plus
                          className={`${
                            isCollapsed ? 'w-5 h-5' : 'w-6 h-6'
                          } !text-gray-700`}
                        />
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-br from-indigo-100 to-gray-100 border border-indigo-200 rounded-b-md shadow-lg  ${
                      openIndex === index ? 'max-h-45' : 'max-h-0'
                    }`}
                  >
                    <ul className='mt-1 space-y-1'>
                      {item.subItems.map((subItem, subIndex) => {
                        const IconSubComponent = subItem.icon;
                        return (
                          <li key={subIndex}>
                            <Link href={subItem.url}>
                              <div
                                className={`block flex items-center  duration-200 ${
                                  isCollapsed
                                    ? 'justify-center py-4'
                                    : 'justify-start px-8 py-4'
                                } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
                                  pathname === subItem.url
                                    ? 'bg-blue-200 text-white'
                                    : ''
                                }`}
                              >
                                <IconSubComponent className='w-6 h-6 !text-gray-700' />

                                <span
                                  className={`${
                                    isCollapsed ? 'hidden' : 'block'
                                  } font-medium text-gray-700`}
                                >
                                  {subItem.name}
                                </span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <Link href={href}>
          <div
            className={`cursor-pointer flex items-center ${
              isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
            }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? 'bg-blue-200 text-white' : ''
        }
      }`}
          >
            <Icon className='w-6 h-6 !text-gray-700' />

            <span
              className={`${
                isCollapsed ? 'hidden' : 'block'
              } font-medium text-gray-700`}
            >
              {label}
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? 'px-5' : 'px-8'
        }`}
      >
        <Link href='/'>
          <Image
            src='/icons/logo.png'
            alt='MYFINWAY-logo'
            width={30}
            height={40}
            className={`rounded ${
              isSidebarCollapsed ? 'w-[22px] h-[18px] ' : 'w-16  h-[20px] '
            }mt-0`}
          />
        </Link>
        <h1
          className={`${
            isSidebarCollapsed ? 'hidden' : 'block'
          } font-extrabold text-2xl`}
        >
          MYFINWAY
        </h1>

        <button
          className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100'
          onClick={toggleSidebar}
        >
          <Menu className='w-4 h-4' />
        </button>
      </div>

      {/* LINKS */}
      <div className='flex-grow mt-8'>
        <SidebarLink
          href='/collapsible'
          icon={Layout}
          label='Dashboard'
          isCollapsed={isSidebarCollapsed}
          isDropdown={true}
        />
        <BootstrapTooltip
          title='Dashboard'
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <span>
            <SidebarLink
              href='/dashboard'
              icon={Layout}
              label='Dashboard'
              isCollapsed={isSidebarCollapsed}
            />
          </span>
        </BootstrapTooltip>

        <SidebarLink
          href='/inventory'
          icon={Archive}
          label='Inventory'
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href='/products'
          icon={Clipboard}
          label='Products'
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href='/users'
          icon={User}
          label='Users'
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href='/settings'
          icon={SlidersHorizontal}
          label='Settings'
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href='/expenses'
          icon={CircleDollarSign}
          label='Expenses'
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
        <p className='text-center text-xs text-gray-500'>&copy; 2025 Mystock</p>
      </div>
    </div>
  );
};

export default Sidebar;
