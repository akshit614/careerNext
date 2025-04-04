"use client";

import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow } from 'date-fns';
import { Brain, BriefcaseIcon, LineChart, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer } from 'recharts';


const DashboardView = ({insights}) => {

  const salaryData = insights.salaryRanges.map((range) => ({
    name : range.role,
    min : range.min / 1000,
    max : range.max / 1000,
    median : range.median / 1000,
  }))

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }

  const getMarketOutlook = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return {icon : TrendingUp ,color : "text-green-500"};
      case "neutral":
        return {icon : LineChart, color : "text-yellow-500"};
      case "negative":
        return {icon : TrendingDown, color : "text-red-500"};
      default:
        return {icon : LineChart, color : "text-gray-500"};
    }
  }

  const OutlookIcon = getMarketOutlook(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlook(insights.marketOutlook).color;

  const lastUpdateDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDate = formatDistanceToNow(new Date(insights.nextUpdate) , { addSuffix : true });
  

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Badge className="font-bold" >Last updated : {lastUpdateDate}</Badge>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-x-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
            <OutlookIcon className={`w-4 h-4 ${outlookColor}`}/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{insights.marketOutlook}</div>
            <p className='text-muted-foreground text-xs'>Next Update : {nextUpdateDate}</p>
          </CardContent>
        </Card>
        
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-x-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
            <OutlookIcon className={`w-4 h-4 ${outlookColor}`}/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{insights.growthRate.toFixed(1)}%</div>
            <Progress value={insights.growthRate} className="mt-2"/>
          </CardContent>
        </Card>

        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-x-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className='h-4 w-4 text-muted-foreground'/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{insights.demandLevel}</div>
            <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`} />
          </CardContent>
        </Card>

        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-x-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className='h-4 w-4 text-muted-foreground'/>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
                {insights.topSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader >
            <CardTitle >Salary ranges by role</CardTitle>
            <CardDescription>Displaying minimum maximum and median salaries in thousands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={({payload, active, label}) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className='bg-background rounded-lg p-2 shadow-md border border-amber-100'>
                        <p className='font-medium'>{label}</p>
                        {payload.map((item) => (
                          <p className='text-sm' key={item.name}>
                            {item.name}: ${item.value}K
                          </p>
                        ))}
                      </div>
                    );
                  } 
                  return null;
                }}/>
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      

    </div>
  )
}

export default DashboardView
