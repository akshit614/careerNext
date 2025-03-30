import React from 'react'
import OnboardingForm from './_components/OnboardingForm'

const OnBoardingPage = ({industries}) => {
  return (
    <main>
      <OnboardingForm industries = {industries}/>
    </main>
  )
}

export default OnBoardingPage