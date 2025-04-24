// components/VisibleTooltip.tsx
import { Transition } from '@headlessui/react';
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const VisibleTooltip = ({
  content,
  children,
  delay = 100,
  position = 'top',
  maxWidth = 'max-w-xs',
}: {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate position based on trigger element
  const updateTooltipPosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = rect.top - 8;
          left = rect.left + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - 8;
          break;
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + 8;
          break;
      }

      setCoords({ top, left });
    }
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      updateTooltipPosition();
      setShowTooltip(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
  };

  // Position classes for tooltip content
  const tooltipPositionClasses = {
    top: '-translate-y-full -translate-x-1/2',
    bottom: 'translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2',
  };

  // Arrow position classes
  const arrowClasses = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45',
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (showTooltip) {
        updateTooltipPosition();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showTooltip]);

  return (
    <>
      <div
        ref={triggerRef}
        className='relative inline-flex'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <Transition
            as={Fragment}
            show={showTooltip}
            enter='transition-opacity duration-150 ease-out'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity duration-150 ease-in'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div
              ref={tooltipRef}
              className='fixed z-[9999]'
              style={{
                top: `${coords.top}px`,
                left: `${coords.left}px`,
              }}
            >
              <div
                className={`relative ${maxWidth} min-w-[120px] rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow-lg ${tooltipPositionClasses[position]}`}
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))',
                }}
              >
                <div
                  className={`absolute h-2 w-2 bg-gray-800 ${arrowClasses[position]}`}
                />
                <div className='whitespace-normal break-words'>{content}</div>
              </div>
            </div>
          </Transition>,
          document.body
        )}
    </>
  );
};
