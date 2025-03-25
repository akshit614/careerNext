import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import Image from 'next/image'

export const HeroSection = () => {
  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
        <div className='space-y-6 text-center'>
            <div className='space-y-6 mx-auto'>
                <h1 className='gradient gradient-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>
                    Your AI Career Coach for <br />
                    Professional Success
                </h1>
                <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                    hey welcome to divyanshu's side hustle.
                </p>
            </div>
            <div>
                <Link href={"/dashboard"}>
                    <Button size="lg" className="px-8 cursor-pointer">Get Started</Button>
                </Link>
            </div>

            <div>
                <div>
                    <Image src={"/banner3.jpeg"} alt='Banner Carrier-next ' width={1280} height={720}
                    className='rounded-lg shadow-2xl mx-auto border' priority/>
                </div>
            </div>

        </div>
    </section>
)
}
