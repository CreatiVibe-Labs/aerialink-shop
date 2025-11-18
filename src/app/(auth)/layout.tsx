import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastContainer/>
       <div className="max-w-7xl grid grid-cols-2 max-md:grid-cols-1  bg-white mx-auto mt-20 mb-15 max-2xl:px-10 max-md:px-5 max-md:min-h-auto gap-45">
      {children}
    
    </div>
    </>
   
  );
};

export default AuthLayout;
