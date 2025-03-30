import { industries } from '@/data/industries'
import React from 'react'

const layoutMain = ({children}) => {
  return (
    <div className='container mt-28 mx-auto mb-20 pl-40' industries={industries}>{children}</div>
  )
}

export default layoutMain