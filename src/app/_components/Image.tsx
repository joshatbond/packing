'use client'

import { type ImgHTMLAttributes, useEffect, useRef, useState } from 'react'

import { cn } from '~/lib/utils'

export function Image({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, loadedAssign] = useState(false)

  // Added this useEffect because if the image was already loaded, it wouldn't trigger the onLoad event.
  useEffect(() => {
    if (ref.current?.complete) loadedAssign(true)
  }, [])

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      {...props}
      ref={ref}
      className={cn(
        className,
        'transition-opacity duration-300',
        !loaded && 'opacity-0'
      )}
      onLoad={() => loadedAssign(true)}
    />
  )
}
