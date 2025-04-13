import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Trophy, SquarePen } from 'lucide-react';


const StatsCard = ({assessments}) => {
    
    const averageScore = () => {
        if(!assessments?.length) return 0;

        const total = assessments.reduce(
            (sum, assessment) => sum + assessment.quizScore, 0
        );

        return (total / assessments.length).toFixed(1);
    }

    const getLatestAssessments = () => {
        if(!assessments?.length) return null;
        return assessments[0];
    }

    const getTotalQuestion = () => {
        if(!assessments?.length) return 0;

        return assessments.reduce(
            (sum, assessment) => sum + assessment.questions.length, 0
        ); 
    }

  return (
    <div className='grid gap-4 md:grid-cols-3'>
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-x-0 ">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-200"/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{averageScore()}%</div>
            <p className='text-muted-foreground text-xs'>Accross all assessments</p>
          </CardContent>
        </Card>
        
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-x-0 ">
            <CardTitle className="text-sm font-medium">Questions Practiced</CardTitle>
            <Brain className="h-4 w-4 text-green-500"/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{getTotalQuestion()}</div>
            <p className='text-muted-foreground text-xs'>Total questions</p>
          </CardContent>
        </Card>
        
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-x-0 ">
            <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            <SquarePen className="h-4 w-4 text-red-500"/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{getLatestAssessments()?.quizScore.toFixed(1) || 0}%</div>
            <p className='text-muted-foreground text-xs'>Most recent quiz</p>
          </CardContent>
        </Card>
        
    </div>
  )
}

export default StatsCard