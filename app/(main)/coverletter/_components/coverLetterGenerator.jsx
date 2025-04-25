"use client";

import { createCoverLetter } from "@/actions/coverLetter";
import { coverLetterSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const CoverLetterGenerator = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        resolver: zodResolver(coverLetterSchema),
      });

    const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
    } = useFetch(createCoverLetter);

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide information about the position you're applying for</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName" >Company Name</Label>
                            <Input id="companyName" placeholder="Enter company name"  {...register("companyName")} />

                            { errors.companyName && (
                                <p className="text-sm text-red-500">{errors.companyName.message}</p>
                            ) }
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle" >Job Title</Label>
                            <Input id="jobTitle" placeholder="Enter job title" {...register("jobTitle")} />
                            { errors.jobTitle && (
                                <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
                            ) }
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jobDescription" >Job Description</Label>
                        <Textarea id="jobDescription" className="h-32" placeholder="Enter job description" {...register("jobTitle")} />
                        { errors.jobDescription && (
                            <p className="text-sm text-red-500">{errors.jobDescription.message}</p>
                        ) }
                    </div>


                    <div className="flex justify-end">
                    <Button type="submit" disabled={generating}>
                        {generating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                        "Generate Cover Letter"
                        )}
                    </Button>
                    </div>
                </form>
            </CardContent>
            
        </Card>

    </div>
  )
}

export default CoverLetterGenerator