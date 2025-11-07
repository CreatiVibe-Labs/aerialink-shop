import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

interface NewsLetterFormButtonProps {
  isSubmitting: boolean;
}

const NewsLetterFormButton: React.FC<NewsLetterFormButtonProps> = ({
  isSubmitting,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`bg-white text-primary font-bold rounded-full center justify-start px-3 height max-md:min-h-10 w-full transition-opacity ${
        isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <IoNotificationsOutline size={20} strokeWidth={2} />
      <span className="px-3 ">
        {isSubmitting ? "Submitting..." : "Subscribe to Newsletter"}
      </span>
    </button>
  );
};

export default NewsLetterFormButton;
