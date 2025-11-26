"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';

type BreadCrumbsProps = {
  className?: string;
};

const BreadCrumbs : FC<BreadCrumbsProps> = ({className = ''}) => {
  const path = usePathname();
  return (
      <div className={`text-sm text-[#AFB1AE] mb-6 space-x-1 ${className}`}>
        <span ><Link href={'/'}>Home</Link></span> <span>/</span> <span className="text-primary font-medium capitalize">{path.replace('/','')}</span>
      </div>
  );
};

export default BreadCrumbs;