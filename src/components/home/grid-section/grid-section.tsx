import React from 'react';
import GridSectionCard from './grid-section-card';



const GridSection = ({className = ''}:{className? : string}) => {
  return (
    <div className={`py-5 grid grid-cols-5 max-w-7xl mx-auto gap-4 max-2xl:px-5 max-md:gap-2 max-md:px-0 max-md:py-3 ${className}`}>
     {/*  */}
     <GridSectionCard label='Plywood' image='/assets/home/product/plywood.png' className='col-span-2'/>
     <GridSectionCard label='Pattern' image='/assets/home/product/stone-pattern.png' className='col-span-3'/>
     {/* bottom card */}
     <GridSectionCard label='Wood Pattern' image='/assets/home/product/wood-pattern.png' className='col-span-3'/>
     <GridSectionCard label='MDF' image='/assets/home/product/mdf.png' className='col-span-2'/>
    </div>
  );
};

export default GridSection;
