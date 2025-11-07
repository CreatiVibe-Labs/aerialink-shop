import LoginForm from './components/login-form'
import AuthImage from '@/components/common/auth-image'

const LoginPage = () => {
  return (
    <>
      {/* form */}
     <LoginForm/>
     {/* image */}
     <AuthImage imageUrl="/assets/auth/login-image.png" imageAlt={"login auth image"}/>
    </>
  
  )
}

export default LoginPage