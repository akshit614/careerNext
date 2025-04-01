"use client"

import { onboardingSchema } from '@/app/lib/schema'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'


const OnboardingForm = ({industries}) => {

  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState : {errors},
    watch,
    setValue,
  } = useForm({
    resolver : zodResolver(onboardingSchema),
  })

  const watchIndustry = watch("industry");
  const onSubmit = async(values) => {
    console.log(values);
    
  }

  return (
    <div className='flex justify-center items-center bg-background'>
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">Complete Your Profile</CardTitle>
          <CardDescription>Select your industry to get personalized career insights and recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2'> 
              <Label htmlFor='industry' className="text-md">Select Industry</Label>
              <Select onValueChange = {(value) => {
                setValue("industry", value);
                setSelectedIndustry(industries.find((ind) => ind.id === value));
                setValue("subIndustry", "");
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => {
                    return (
                    <SelectItem value={ind.id} key={ind.id}>{ind.name}</SelectItem>
                  );
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className='text-sm text-red-500'>{errors.industry.message}</p>
              )}
            </div>

            { watchIndustry &&  (
              <div className='space-y-2'>
                <Label htmlFor='subIndustry' className="text-md">Select Specializatoin</Label>
                <Select onValueChange = {(value) => {
                  setValue("subIndustry", value);
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subIndustry" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => {
                      return (
                      <SelectItem value={ind} key={ind}>{ind}</SelectItem>
                    );
                    })}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className='text-sm text-red-500'>{errors.subIndustry.message}</p>
                )}
              </div>)
            }

            <div className='space-y-2'>
              <Label htmlFor="experience" className="text-md">Year of Experience</Label>
              <Input id="experience" type="number" min="0" max="50" placeholder="Enter years of experience" {...register("experience")} /> 
              {errors.experience && (
                  <p className='text-sm text-red-500'>{errors.experience.message}</p>
                )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor="skills" className="text-md">Your Skills</Label>
              <Input id="skills" placeholder="e.g., JavaScript, Python, Prisma" {...register("skills")} /> 
              <p className='text-sm text-muted-foreground pl-2'>*Separate multiple skills with commas</p>
              {errors.skills && (
                  <p className='text-sm text-red-500'>{errors.skills.message}</p>
                )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor="bio" className="text-md">Your Bio</Label>
              <Textarea id="bio" placeholder="Tell us baout your professional background..." className="h-32" {...register("bio")} /> 

              {errors.bio && (
                  <p className='text-sm text-red-500'>{errors.bio.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full">
                Complete Setup  
            </Button>
          </form>
        </CardContent>

      </Card>

    </div>
  )
}

export default OnboardingForm;