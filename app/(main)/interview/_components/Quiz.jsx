"use client";

import { generateQuiz } from '@/actions/interview';
import useFetch from '@/hooks/useFetch';
import  { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { BarLoader } from 'react-spinners';


const Quiz = () => {

  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
      loading : generatingQuiz,
      fn : generateQuizFn,
      data : quizData,
  } = useFetch(generateQuiz)


  useEffect(() => {
    if(quizData) {
        setAnswers(new Array(quizData.length).fill(null)) ;
    }
  },[quizData]);

    if (!quizData) {
        return  <div className='flex justify-center pt-10'>
        <Card className="mx-2 md:max-w-3xl">
        <CardHeader>
          <CardTitle>Ready To Test Your Knowledge</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            This quiz contains 10 questions specific to your industry and skills. 
            Take your time and choose the right answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateQuizFn}>Start Quiz</Button>
        </CardFooter>
      </Card>
        </div>
    }

    if(generatingQuiz) {
        return <BarLoader className='mt-4' width={"100%"} color='gray'/>
    }

    

    const question = quizData[currentQuestion];

  return (

    <Card className="mx-2 md:max-w-3xl">
        <CardHeader>
          <CardTitle>Question {currentQuestion + 1} of {quizData.length}</CardTitle>
        </CardHeader>
        <CardContent>
        <p>Q. {question.question}</p>

        <RadioGroup defaultValue="option-one" className="pl-5 pt-2"> 
            {question.options.map((option,index) => {
                return (
                    <div className="flex items-center space-x-2 p-1" key={index}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                );
            })}
        
        </RadioGroup>

        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateQuizFn}>Next Question</Button>
        </CardFooter>
      </Card>
  )
}

export default Quiz