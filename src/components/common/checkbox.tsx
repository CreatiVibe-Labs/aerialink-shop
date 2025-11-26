// components/common/checkbox.tsx
import { InputHTMLAttributes, ReactElement, forwardRef } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactElement | string;
  error?: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="inline-flex items-center justify-center cursor-pointer select-none">
          {/* Hidden native checkbox - RHF ke liye register hoga */}
          <input type="checkbox" ref={ref} className="sr-only peer" {...rest} />

          {/* Custom box */}
          <div
            className={`lg:w-5 lg:h-5 w-[17px] h-[17px] flex items-center justify-center rounded-[3.42px] border-[0.77px] border-[#98C1A9] bg-white transition-colors
              peer-checked:border-primary 
              peer-checked:[&>svg]:opacity-100
              ${className}`}
          >
            <IoMdCheckmark className="text-primary lg:w-4 lg:h-4 w-[17px] h-[17px]  opacity-0 transition-opacity" />
          </div>

          {label && (
            <span className="ml-2 lg:mt-1 mt-0 text-[#AFB1AE] font-albert-sans font-[500] text-[12px] lg:text-[14px] leading-[100%]">
              {label}
            </span>
          )}
        </label>

        {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
