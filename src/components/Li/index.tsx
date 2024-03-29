import Link from 'next/link'
import React from 'react'

import { UrlObject } from 'url';

declare type Url = string | UrlObject;

interface Props {
    children:React.ReactNode
    href?:Url,
    as?:Url,
    className?:string
}

function Li({href="#",children,as="",className=""}:Props) {
  return (
    <Link href={href} as={as || href}>
        <a className={className}>{children}</a>
    </Link>
  )
}

export default Li