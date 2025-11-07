import Link from 'next/link'
import { FaArrowUpLong } from 'react-icons/fa6'

const BackButtonLarge = () => {
  return (
    <Link href={''} className='px-10 font-bold height max-md:min-h-11  rounded-custom text-white text-lg capitalize flex items-center justify-center space-x-2 transition-colors duration-200 bg-primary w-fit max-md:text-base max-md:'>
     <span>Go Back To Homepage</span> <FaArrowUpLong size={15} className='rotate-[35deg] '/> 
    </Link>
  )
}

export default BackButtonLarge