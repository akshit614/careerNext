import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
import React from 'react'
import { CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const QuizResult = ({result,hideStartNew = false, onStartNew}) => {

    if(!result) return null;

  return (
    <div className='mx-auto'>
        <h1 className='flex items-center gap-2 text-3xl gradient-title'>
            <Trophy className='h-6 w-6 text-yellow-500'/>
            Quiz Result
        </h1>

        <CardContent className="space-y-6">
            {/* Score OverView */}
            <div className='text-center space-y-2'>
                <h3 className='text-2xl font-bold'>Score {result.quizScore.toFixed(1)}%</h3>
                <Progress value={result.quizScore} className="w-full" />
            </div>

            {/* Improvement tip */}
            {result.improvementTip && 
                <div className='bg-muted p-4 rounded-lg'>
                    <p className='font-medium'>Improvement Tip :</p>
                    <p className='text-muted-foreground'>{result.improvementTip }</p>
                </div>
            }

            <div className='space-y-4'>
                <h1 className='py-4 font-medium text-xl'>Questions Review</h1>
                {result.questions.map((q,index) => (
                    <div className='border-3 rounded-lg p-4 space-y-2 border-gray-700' key={index}>
                    <div className='flex items-center justify-between gap-2'>
                        <p className='font-medium'>Q. {q.question}</p>
                        {q.isCorrect  ? (
                            <CheckCircle2 className='h-5 w-5 text-green-500 flex-shrink-0'/>
                        ) : (
                            <XCircle className='h-5 w-5 text-red-500 flex-shrink-0'/>
                        )}
                    </div>

                    <div className='text-sm text-muted-foreground'>
                        <p> Your answer : {q.userAnswer}</p>
                        {!q.isCorrect && <p>Correct answer : {q.answer}</p>}
                    </div>

                    <div className='text-sm bg-muted p-2 rounded'>
                        <p className='font-medium'>Explanation : </p>
                        <p>{q.explanation}</p>
                    </div>
                    </div>
                ))}
            </div>
        </CardContent>

        {!hideStartNew && (
            <CardFooter className="py-6 flex justify-center">
                <Button className="w-xl" onClick={onStartNew}>Start New Quiz</Button>
            </CardFooter>)
            }
    </div>
  )
}

export default QuizResult