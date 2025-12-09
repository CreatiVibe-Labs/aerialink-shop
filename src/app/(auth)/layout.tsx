import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastContainer/>
      <div className="max-w-7xl grid grid-cols-2 max-md:grid-cols-1 mx-auto md:mt-20 md:mb-15 mt-10 mb-6 max-md:min-h-auto gap-45">
      {children}
    
    </div>
    </>
   
  );
};

export default AuthLayout;
