import NewPasswordForm from "./components/new-password-form";
import AuthImage from "@/components/common/auth-image";

const NewPasswordPage = () => {
  return (
    <>
      {/*  form */}
      <NewPasswordForm />
      {/*  image */}
      <AuthImage
        imageUrl="/assets/auth/forgot-pass-image.png"
        imageAlt={"new password image"}
      />
    </>
  );
};

export default NewPasswordPage;
