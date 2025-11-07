import { FC, ReactElement } from "react";

interface HomeBottomChipCardProps {
  icon: ReactElement;
  lable: string;
}

const HomeBottomChipCard: FC<HomeBottomChipCardProps> = ({ icon, lable}) => {
  return (
    <div className="min-h-[4rem] border border-primary rounded-xl space-x-1 center text-primary text-lg max-lg:text-base max-md:text-sm max-sm:text-xs">
      <span>{icon}</span> <span>{lable}</span>
    </div>
  );
};

export default HomeBottomChipCard;
