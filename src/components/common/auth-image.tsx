"use client";
import Image from 'next/image'
import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'

interface AuthImageProps {
  imageUrl: string
  imageAlt: string
  variant?: 'login' | 'register'
  wrapperClassName?: string
}

const AuthImage: React.FC<AuthImageProps> = ({ imageUrl, imageAlt, variant, wrapperClassName }) => {
  const pathname = usePathname()

  // Auto-detect variant if not explicitly provided
  const resolvedVariant: 'login' | 'register' | undefined = useMemo(() => {
    if (variant) return variant
    if (!pathname) return undefined
    if (pathname.includes('/register')) return 'register'
    if (pathname.includes('/login')) return 'login'
    return undefined
  }, [variant, pathname])

  const baseWrapper = 'relative max-md:hidden rounded-2xl'

  // Dimensions based on variant (register requires fixed width/height)
  const dimensions = resolvedVariant === 'register'
    ? 'w-full min-h-[500px]'
    : 'w-full min-h-[500px]'

  // Spacing defaults can differ per variant
  const spacing = resolvedVariant === 'register'
    ? ''
    : ''

  const wrapperClasses = wrapperClassName
    ? `${baseWrapper} ${wrapperClassName + 'min-h-[500px] '}`
    : `${baseWrapper} ${dimensions} ${spacing}`

  return (
    <div className={wrapperClasses}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover rounded-2xl object-top"
        priority
      />
    </div>
  )
}

export default AuthImage