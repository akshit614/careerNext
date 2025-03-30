import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center px-4 min-h-[100vh]'>
        <h1 className='text-6xl font-extrabold gradient-title mb-4'>404</h1>
        <h2 className='text-2xl font-semibold mb-4'>Not Found</h2>
        <p className='text-gray-400 mb-8'>Oops! This page does not exist or has been moved.</p>

        <Link href={'/'}>
            <Button className="" >Return Home</Button>
        </Link>
    </div>
  )
}

export default NotFound