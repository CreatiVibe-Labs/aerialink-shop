import Link from "next/link";
import { FC } from "react";
import { GoChevronLeft } from "react-icons/go";

interface BackButtonProps {
  href: string;
  label: string;
  className? : string
}
const BackButton: FC<BackButtonProps> = ({ href, label,className = ''}) => {
  return (
    <Link href={href || "/"} className={`capitalize center space-x-1  ${className}`}>
      <GoChevronLeft   size={30}  /> {label || 'back'}
    </Link>
  );
};

export default BackButton;
