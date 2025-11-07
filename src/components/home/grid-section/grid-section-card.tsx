import React, { FC } from 'react';

interface GridSectionCardProps {
 className? : string,
 image : string,
 label : string
}

const GridSectionCard : FC<GridSectionCardProps> = ({className = '',image,label}) => {
  return (
    <div className={` bg-center bg-no-repeat min-h-[18rem] max-md:min-h-[12rem] max-sm:min-h-[8rem] w-full relative rounded-xl bg-cover ${className}`}
    
    style={{backgroundImage : `url(${image})`}}>
      <div className="absolute w-full h-full bg-gradient-to-b to-black/90 rounded-xl center items-end justify-start p-5">
    <h2 className='font-bold text-white text-[2vmax]'>{label}</h2>
      </div>
    </div>
  );
};

export default GridSectionCard;