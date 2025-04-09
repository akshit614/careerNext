import { industries } from '@/data/industries'
import React from 'react'

const layoutMain = ({children}) => {
  return (
    <div className='container mt-28 mx-auto mb-20 px-4 md:px-6 lg:px-10' industries={industries}>{children}</div>
  )
}

export default layoutMain
