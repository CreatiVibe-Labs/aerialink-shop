import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ToastContainer/>
       <div className="max-w-7xl mb-20 grid grid-cols-2 max-md:grid-cols-1  bg-white mx-auto mt-10 min-h-screen max-2xl:px-10 max-md:px-5 max-md:min-h-auto gap-3">
      {children}
    
    </div>
    </>
   
  );
};

export default AuthLayout;
