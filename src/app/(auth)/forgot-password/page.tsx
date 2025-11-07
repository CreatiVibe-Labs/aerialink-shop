import AuthImage from "@/components/common/auth-image";
import ForgotPasswordForm from "./components/forgot-password-form";

const ForgotPassword = () => {
  return (
    <>
      {/*form */}
      <ForgotPasswordForm />
      {/* image */}
      <AuthImage
        imageUrl="/assets/auth/forgot-pass-image.png"
        imageAlt={"forgot image"}
      />
    </>
  );
};

export default ForgotPassword;
