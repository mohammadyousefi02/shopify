import Link from 'next/link'
import React from 'react'

interface Props {
    href?:string,
    children:React.ReactNode
}

function Li({href="#",children}:Props) {
  return (
    <Link href={href}>
        <a>{children}</a>
    </Link>
  )
}

export default Li