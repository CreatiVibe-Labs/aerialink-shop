import React, { FC } from 'react';

interface SmallHeadingProps {
 label : string,
 className? : string
}

const SmallHeading :FC<SmallHeadingProps> = ({label,className = ''}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
     <div className="bg-primary rounded w-3"></div>
     <h2 className='font-medium text-min-gray'>{label}</h2></div>
  );
};

export default SmallHeading;