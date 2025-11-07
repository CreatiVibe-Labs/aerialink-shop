import RegisterForm from "./components/register-form";
import AuthImage from "@/components/common/auth-image";

const RegisterPage = () => {
  return (
    <>
      {/* image */}
      <AuthImage
        imageUrl="/assets/auth/register-image.png"
        imageAlt={"register image"}
      />
      {/* form */}
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
