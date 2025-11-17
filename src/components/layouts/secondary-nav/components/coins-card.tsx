import { useProfile } from "@/contexts/profile-context";
import React from "react";
import { BiDollarCircle } from "react-icons/bi";

const CoinsCard = () => {
  const { user } = useProfile();
  return (
    <div className="max-md:hidden border-2  border-primary text-primary space-x-1 center rounded-2xl px-1.5 py-0.5">
      <BiDollarCircle size={30} />{" "}
      <span className="font-extrabold text-lg ">
        {/* {user?.wallet?.balance ?? 0}

         */0}
      </span>
    </div>
  );
};

export default CoinsCard;
