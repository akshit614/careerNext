import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CoverLetterGenerator from '../_components/coverLetterGenerator';

const newCoverLetter = () => {
  return (
    <div className='container mx-auto space-y-4 py-2'>
        <div className='flex flex-col space-y-2 mx-2'>
            <Link href={'/coverletter'}>
                <Button variant="link" className="gap-2 pl-0 cursor-pointer">
                    <ArrowLeft className='h-4 w-4' />
                    Back to all cover letters
                </Button>
            </Link>

            <div>
                <h1 className="text-6xl gradient-title font-bold">Create Cover Letter</h1>
                <p className='text-muted-foreground'>Generate a tailored cover letter for your job application</p>
            </div>

        </div>
        <CoverLetterGenerator />
    </div>
  )
}

export default newCoverLetter