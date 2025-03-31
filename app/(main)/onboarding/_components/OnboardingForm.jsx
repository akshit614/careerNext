"use client"

import { onboardingSchema } from '@/app/lib/schema'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'

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

  return (
    <div className='flex justify-center items-center bg-background'>
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">Complete Your Profile</CardTitle>
          <CardDescription>Select your industry to get personalized career insights and recommendations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className='space-y-2'>
              <Label htmlFor='industry' className="text-md">Industry</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
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
            </div>
          </form>
        </CardContent>

      </Card>

    </div>
  )
}

export default OnboardingForm;