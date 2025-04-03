import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import DashboardView from './_components/DashboardView';


const IndustryInsightsPage = async() => {

  const insights = await getIndustryInsights();
  const { isOnboarded } = await getUserOnboardingStatus();
  if(!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div className='container mx-auto'>
      <DashboardView insights={insights}/>
    </div>
  )
}

export default IndustryInsightsPage