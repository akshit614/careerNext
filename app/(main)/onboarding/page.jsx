import React from 'react'
import OnboardingForm from './_components/OnboardingForm'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';

const OnBoardingPage = async ({industries}) => {

  const { isOnboarded } = await getUserOnboardingStatus();
  if(isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries = {industries}/>
    </main>
  )
}

export default OnBoardingPage