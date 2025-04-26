import { getCoverLetter } from '@/actions/coverLetter';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CoverLetterPreview from '../_components/coverLetterPreview';


const CoverLetterPage = async ({ params }) => {

    const { id } = await params;
    const coverLetter = await getCoverLetter(id)

  return (
    <div className="container mx-auto py-6">
        <div className='flex flex-col space-y-2 mx-2'>
            <Link href={'/coverletter'}>
                <Button variant="link" className="gap-2 pl-0 cursor-pointer">
                    <ArrowLeft className='h-4 w-4' />
                    Back to all cover letters
                </Button>
            </Link>

            <h1 className="text-6xl font-bold gradient-title mb-6">
                {coverLetter?.jobTitle} at {coverLetter?.companyName}
            </h1>
            <CoverLetterPreview content={coverLetter?.content} />
        </div>
    </div>
  )
}

export default CoverLetterPage