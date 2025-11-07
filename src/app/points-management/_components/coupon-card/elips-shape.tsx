import React, { FC } from 'react';

interface ElipsShapeProps {
  className?: string;
}

const ElipsShape : FC<ElipsShapeProps> = ({className}) => {
  return (
    <div className={`elips-shape absolute bg-white size-10  rotate-45 ${className}`}></div>
  );
};

export default ElipsShape;