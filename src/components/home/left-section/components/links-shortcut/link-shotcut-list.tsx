import { FC, ReactElement } from "react";

interface linkProps {
  icon: ReactElement;
  label: string;
}
const LinkShotcutList: FC<linkProps> = ({ icon, label }) => {
  return (
    <div className="flex space-x-2 items-center text-[#AFB1AE] hover:text-black cursor-pointer">
      <span>{icon}</span> <span>{label ?? "label"}</span>
    </div>
  );
};

export default LinkShotcutList;
