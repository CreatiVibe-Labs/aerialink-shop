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
        <label className="inline-flex items-center cursor-pointer select-none">
          {/* Hidden native checkbox - RHF ke liye register hoga */}
          <input
            type="checkbox"
            ref={ref}
            className="sr-only peer"
            {...rest}
          />

          {/* Custom box */}
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-md border border-light-gray bg-white transition-colors
              peer-checked:border-primary 
              peer-checked:[&>svg]:opacity-100
              ${className}`}
          >
            <IoMdCheckmark className="text-primary w-4 h-4 opacity-0 transition-opacity" />
          </div>

          {label && <span className="ml-2 text-gray-700">{label}</span>}
        </label>

        {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;