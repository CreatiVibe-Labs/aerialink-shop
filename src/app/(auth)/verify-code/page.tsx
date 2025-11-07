import AuthImage from "@/components/common/auth-image";
import VerifyCodeForm from "./components/verify-code-form";

const VerifyCodePage = () => {
  return (
    <>
      {/* form */}
      <VerifyCodeForm />
      {/* image */}
      <AuthImage
        imageUrl="/assets/auth/login-image.png"
        imageAlt={"login auth image"}
      />
    </>
  );
};

export default VerifyCodePage;
