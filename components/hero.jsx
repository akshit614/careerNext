"use client"

import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

export const HeroSection = () => {

    const imageRef = useRef(null);
    useEffect(()=> {
        const imageElement = imageRef.current;

        const handleScroll = () => {

            const scrollPostion = window.scrollY;
            const scrollThreshold = 100;
            if(scrollPostion > scrollThreshold) {
                imageElement.classList.add("scrolled");
            }else {
                imageElement.classList.remove("scrolled");
            }
        }

        window.addEventListener("scroll", handleScroll);
        return ()=> window.removeEventListener("scroll", handleScroll);

    }, [])

  return (
    <section className='w-full pt-36 md:pt-40 pb-10'>
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

            <div className='hero-image-wrapper mt-5 md:mt-0 mb-5'>
                <div ref={imageRef} className='hero-image'>
                    <Image src={"/banner3.jpeg"} alt='Banner Carrier-next ' width={720} height={460}
                    className='rounded-lg shadow-2xl mx-auto border' priority/>
                </div>
            </div>

        </div>
    </section>
)
}
