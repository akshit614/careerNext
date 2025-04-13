"use client";

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import QuizResult from './QuizResult';


const QuizList = ({assessments}) => {

  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-3xl gradient-title md:text-4xl">Recent quizzes</CardTitle>
            <CardDescription>Review you past quizzes performance</CardDescription>
          </div>
          <Button onClick={() => router.push("/interview/mock")}>Start New Quiz</Button>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {assessments.map((assessment,index) => {
              return (
                <Card key={assessment.id} className="cursor-pointer hover:bg-muted/100 transition-colors border-2" onClick={() => {setSelectedQuiz(assessment)}}>
                  <CardHeader>
                    <CardTitle>Quiz {index + 1}</CardTitle>
                    <CardDescription>
                      <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                      <div>
                        {format(new Date(assessment.createdAt),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>

    </>
  )
}

export default QuizList