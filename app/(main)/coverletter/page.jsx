import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import CoverLetterList from './_components/coverletterList'
import Link from 'next/link'

const resumePage = () => {
  return (
    <div>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5 ">
            <p className="text-6xl gradient-title font-bold">My Cover Letters</p>
            <Link href="/coverletter/new">
            <Button>
                <Plus className="h-4 w-4" />
                Create New
            </Button>
            </Link>
        </div>

        <CoverLetterList />
    </div>
  )
}

export default resumePage