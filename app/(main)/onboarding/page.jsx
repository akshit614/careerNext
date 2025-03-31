import React from 'react'
import OnboardingForm from './_components/OnboardingForm'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import { industries } from '@/data/industries';
industries

const OnBoardingPage = async () => {

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