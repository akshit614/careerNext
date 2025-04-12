"use client";

import { generateQuiz, saveQuizResult } from '@/actions/interview';
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
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import QuizResult from './QuizResult';


const Quiz = () => {

  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
      loading : generatingQuiz,
      fn : generateQuizFn,
      data : quizData,
  } = useFetch(generateQuiz)

  const {
      loading : savingResult,
      fn : savingResultFn,
      data : resultData,
      setData : setResultData 
  } = useFetch(saveQuizResult)
  
  console.log(resultData);
  

  useEffect(() => {
    if(quizData) {
        setAnswers(new Array(quizData.length).fill(null)) ;
    }
  },[quizData]);
  
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  }

  const handleNext = () => {
    if(currentQuestion < quizData.length - 1) {
      setcurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    }
    else {
      finishQuiz()
    }
  }

  const calculateScore = () => {
    let count = 0 ;
    answers.forEach((answer,index) => {
      if (answer === quizData[index].correctAnswer) {
        count++;
      }
    })
    return (count / quizData.length) * 100;
  }

  const startNewQuiz = () => {
    setAnswers([])
    setcurrentQuestion(0)
    setShowExplanation(false)
    generateQuizFn()
    setResultData(null)
  }

  const finishQuiz = async() => {
    const score = calculateScore();
    try {
      await savingResultFn(quizData, answers, score)
      toast.success("Quiz Completed!")
    } catch (error) {
      toast.error(error.message || "Failed to save the quiz!")
    }
  }

  if(generatingQuiz) {
    return <BarLoader className='mt-4' width={"100%"} color='gray'/>
  }

  if (resultData) {
    return <div className='mx-2'>
      <QuizResult result = {resultData} onStartNew = {startNewQuiz}/>
    </div>
  }

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

  const question = quizData[currentQuestion];

  return (

    <Card className="mx-2">
        <CardHeader>
          <CardTitle>Question {currentQuestion + 1} of {quizData.length}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <p className='text-lg font-medium'>Q. {question.question}</p>

        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]}  className="space-y-2"> 
            {question.options.map((option,index) => {
                return (
                    <div className="flex items-center space-x-2 p-1" key={index}>
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                );
            })}
        
        </RadioGroup>
            {showExplanation && 
              <div className='mt-4 p-4 rounded-lg bg-muted'>
                <p className='font-medium'>Explanation : </p>
                <p className='text-muted-foreground '>{question.explanation}</p>
              </div>
            }
        </CardContent>
        <CardFooter className="flex justify-between">

          { !showExplanation ? 
            <Button onClick={() => setShowExplanation(true)} variant="outline" disabled={!answers[currentQuestion]}>
              Show Explanation
            </Button> :
            <Button onClick={() => setShowExplanation(false)} variant="outline" disabled={!answers[currentQuestion]}>
              Hide Explanation
            </Button>
          }
           
          <Button className="ml-auto" onClick={handleNext} disabled={!answers[currentQuestion] || savingResult}>
            {savingResult && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />)
            }
            {currentQuestion < quizData.length - 1 ? "Next Question" : "Submit Quiz"}
          </Button> 
          
        </CardFooter>
      </Card>
  )
}

export default Quiz