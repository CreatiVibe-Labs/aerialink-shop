import Image from 'next/image'
import React from 'react'

const AuthImage = ({imageUrl,imageAlt} : {imageUrl : string,imageAlt : string}) => {
  return (
       <div className="relative w-full h-full max-md:hidden mt-10"> 
         <Image
           src={imageUrl}
           alt={imageAlt}
           fill 
           className="object-contain rounded-2xl"
         />
       </div>
  )
}

export default AuthImage