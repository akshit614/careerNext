import { useParams } from 'next/navigation'
import React from 'react'

const CoverLetterPage = async ({params}) => {

    const { id } = await params;
  return (
    <div>CoverLetterPage</div>
  )
}

export default CoverLetterPage