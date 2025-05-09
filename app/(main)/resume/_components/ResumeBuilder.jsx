"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/app/lib/schema';
import useFetch from '@/hooks/useFetch';
import { saveResume } from '@/actions/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import EntryForm from './entryForm';
import { entriesToMarkdown } from '@/app/lib/helper';
import MDEditor from '@uiw/react-md-editor';
import { useUser } from '@clerk/nextjs';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';
// import { html2pdf } from 'html2pdf.js/dist/html2pdf.min.js';

const ResumeBuilder = ({initialContent}) => {
    
    const [activeTab, setActiveTab] = useState("edit");
    const [resumeMode, setResumeMode] = useState("preview");
    const [previewContent, setPreviewContent] = useState(initialContent)
    const {user} = useUser();
    const [isGenerating, setIsGenerating] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({
        resolver : zodResolver(resumeSchema),
        defaultValues :{
        contactInfo: {},
        summary: "",
        skills: "",
        experience: [],
        education: [],
        projects: [],
        }
    })

    const {
        loading : isSaving,
        fn : saveResumeFn,
        data : saveResult,
        error : saveError,
    } = useFetch(saveResume)

    const formValues = watch();

    useEffect(() => {
        if(initialContent) setActiveTab("preview")
    }, [initialContent])

    // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('resume-pdf');
      console.log(element);   
      const html2pdfModule = await import("html2pdf.js/dist/html2pdf.bundle.min.js"); 
      const html2pdf = html2pdfModule.default;
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if(saveResult && !isSaving) {
        toast.success("Resume saves!")
    }
    if(saveError) {
        toast.error(saveError.message || "Failed to save resume!")
    }
  },[saveResult, isSaving, saveError])

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className='space-y-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
            <h1 className='gradient-title font-bold text-5xl md:text-6xl'>Resume Builder</h1>

        <div className='space-x-2'>
            <Button variant="destructive" onClick={onSubmit} disabled={isSaving}> 
                
                {isSaving ? (
                    <>
                        <Loader2 className='h-4 w-4 animate-spin'/>
                        Saving...
                    </>
                ) : (
                    <>
                        <Save className='h-4 w-4' />
                        Save
                    </>
                )}
            </Button>
            <Button onClick={generatePDF} disabled={isGenerating}> 
                {isGenerating ? (
                    <>
                        <Loader2 className='h-4 w-4 animate-spin'/>
                        Generating Pdf...
                    </>
                ) : (
                    <>
                        <Download className='h-4 w-4' />
                        Download PDF
                    </>
                )}
            </Button>
        </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
            <TabsTrigger value="edit">Form</TabsTrigger>
            <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
            <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Contact Information</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2  p-4 gap-4 border rounded-lg mg-muted/50'>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Email</label>
                            <Input 
                            {...register("contactInfo.email")} 
                            type="email" placeholder="your@email.com"
                            error= {errors.contactInfo?.email}    />

                            {errors.contactInfo?.email && (
                                <p className='text-sm text-red-500'>{errors.contactInfo.email.message}</p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Mobile Info</label>
                            <Input 
                            {...register("contactInfo.mobile")} 
                            type="tel" placeholder="0123456789"
                            error= {errors.contactInfo?.mobile}    />

                            {errors.contactInfo?.mobile && (
                                <p className='text-sm text-red-500'>{errors.contactInfo.mobile.message}</p>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>Linkedin Info</label>
                            <Input 
                            {...register("contactInfo.linkedin")} 
                            type="url" placeholder="linkedin url"
                            error= {errors.contactInfo?.linkedin}    />

                            {errors.contactInfo?.linkedin && (
                                <p className='text-sm text-red-500'>{errors.contactInfo.linkedin.message}</p>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium'>X Account</label>
                            <Input 
                            {...register("contactInfo.twitter")} 
                            type="url" placeholder="X username"
                            error= {errors.contactInfo?.twitter}    />

                            {errors.contactInfo?.twitter && (
                                <p className='text-sm text-red-500'>{errors.contactInfo.twitter.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <h1 className='text-lg font-medium'>Professional Summary</h1>
                        <Controller
                            name='summary'
                            control = {control}
                            render={({field}) => (
                                <Textarea 
                                {...field}
                                className="h-32"
                                placeholder = "Write a professional summary!" 
                                error = {errors.summary}
                                />
                            )}
                        />
                        {errors.summary && (
                            <p className='text-sm text-red-500'>{errors.summary.message}</p>
                        )}
                    </div>

                    <div className='space-y-6'>
                        <h1 className='text-lg font-medium'>Key Skills</h1>
                        <Controller
                            name='skills'
                            control = {control}
                            render={({field}) => (
                                <Textarea 
                                {...field}
                                className="h-32"
                                placeholder = "Some of your skills..." 
                                error = {errors.skills}
                                />
                            )}
                        />
                        {errors.skills && (
                            <p className='text-sm text-red-500'>{errors.skills.message}</p>
                        )}
                    </div>
                </div>

                <div className='space-y-6'>
                        <h1 className='text-lg font-medium'>Work Experience</h1>
                        <Controller
                            name='experience'
                            control = {control}
                            render={({field}) => (
                                <EntryForm type="experience" entries={field.value} onChange={field.onChange} />
                            )}
                        />
                        {errors.experience && (
                            <p className='text-sm text-red-500'>{errors.experience.message}</p>
                        )}
                </div>
                <div className='space-y-6'>
                        <h1 className='text-lg font-medium'>Education Information</h1>
                        <Controller
                            name='education'
                            control = {control}
                            render={({field}) => (
                                <EntryForm type="education" entries={field.value} onChange={field.onChange}/>
                            )}
                        />
                        {errors.education && (
                            <p className='text-sm text-red-500'>{errors.education.message}</p>
                        )}
                </div>
                <div className='space-y-6'>
                        <h1 className='text-lg font-medium'>Projets Information</h1>
                        <Controller
                            name='projects'
                            control = {control}
                            render={({field}) => (
                                <EntryForm type="projects" entries={field.value} onChange={field.onChange} />
                            )}
                        />
                        {errors.projects && (
                            <p className='text-sm text-red-500'>{errors.projects.message}</p>
                        )}
                </div>

            </form>
        </TabsContent>
        <TabsContent value="preview">
            <Button variant="link" type="button" className="mb-2" 
                onClick={() => setResumeMode(resumeMode === "preview" ? "edit" : "preview")}>
                {resumeMode === "preview" ? (
                    <>
                        <Edit className='h-4 w-4'/>
                        Edit Resume
                    </>
                ) : (
                    <>
                    <Monitor className='h-4 w-4'/>
                    Show Preview
                    </>
                )}
                
            </Button>

            {resumeMode !== "preview" && (
                <div className='flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2'>
                    <AlertTriangle className='h-5 w-5'/>
                    <span className='text-sm'>
                        You will lose edited markdown if you update the form data
                    </span>
                </div>
            )}     

            <div className='rounded-lg border'>
                <MDEditor value={previewContent} onChange={setPreviewContent} height={800} preview={resumeMode}/>
            </div>
            <div className='hidden'>
            <div id='resume-pdf' style={{ color: "black" }}>
                <MDEditor.Markdown 
                source={previewContent}
                style={{
                    background : "white",
                    color : "black"
                }}/>
            </div>
            </div>

        </TabsContent>
        </Tabs>

    </div>
  )
  
}

export default ResumeBuilder