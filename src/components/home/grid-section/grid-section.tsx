import React from 'react';
import GridSectionCard from './grid-section-card';



const GridSection = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`grid grid-cols-5 xl:gap-5 lg:gap-5 md:gap-5 gap-2 py-5 lg:mt-5 md:mt-5 mt-[-20px] xl:mt-5 ${className}`}>
      {/*  */}
      <GridSectionCard label='Plywood' image='/assets/home/product/plywood.png' className='col-span-2' />
      <GridSectionCard label='Pattern' image='/assets/home/product/stone-pattern.png' className='col-span-3' />
      {/* bottom card */}
      <GridSectionCard label='Wood Pattern' image='/assets/home/product/wood-pattern.png' className='col-span-3' />
      <GridSectionCard label='MDF' image='/assets/home/product/mdf.png' className='col-span-2' />
    </div>
  );
};

export default GridSection;
