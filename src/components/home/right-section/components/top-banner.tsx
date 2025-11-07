import Image from 'next/image';
import React from 'react';

const TopBanner = () => {
  return (
    <div className='w-full min-h-[13rem] max-sm:min-h-[8rem] relative border-2 border-light-gray rounded-2xl overflow-hidden'>
     <Image src={'/assets/home/top-banner.png'} alt='top banner' fill className='object-cover'/>
    </div>
  );
};

export default TopBanner;