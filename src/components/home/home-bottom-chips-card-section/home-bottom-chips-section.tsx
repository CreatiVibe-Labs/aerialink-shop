import React from 'react';
import { CiDeliveryTruck, CiDollar } from 'react-icons/ci';
import HomeBottomChipCard from './components/home-bottom-chip-card';
import { LuTimerReset } from 'react-icons/lu';
import { ImStatsBars } from 'react-icons/im';

const HomeBottomChipsSection = () => {
 const cardData = [
  {
   icon : <CiDollar size={20}/>,
   label : "Safe Payment"
  },
  {
   icon : <CiDeliveryTruck size={23} />,
   label : "Nationwide delivery"
  },
  {
   icon : <LuTimerReset />,
   label : "Fast and easy returns"
  },
  {
   icon : <ImStatsBars />,
   label : "Best Quality"
  },
 ]
  return (
    <div className='grid grid-cols-4 gap-4 mb-10 my-5 max-lg:grid-cols-2 max-sm:grid-cols-2 max-sm:gap-2'>
      {cardData.map((item,index)=> <HomeBottomChipCard key={index} icon={item.icon} lable={item.label}/>)}
    </div>
  );
};

export default HomeBottomChipsSection;