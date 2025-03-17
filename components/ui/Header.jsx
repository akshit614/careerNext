import { SignInButton, SignedOut, SignUpButton, UserButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { LayoutDashboard } from 'lucide-react'

const Header = () => {
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60 px-10'>
      <nav className='container mx-auto px-4 h-16 flex justify-between items-center'>
          <Link href={'/dashboard'}>
          <Image src={'vercel.svg'} alt='Logo' width={200}  height={20} className='h-12 py-1 w-auto object-contain'/>
          </Link>
        <div className='flex'>
        <SignedIn>
          <Link href={'/'} className='px-4'> <Button> 
            <LayoutDashboard/> Get Started
            </Button> 
          </Link>
          <UserButton/>
        </SignedIn>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        </div>
      </nav>
    </header>
  )
}

export default Header