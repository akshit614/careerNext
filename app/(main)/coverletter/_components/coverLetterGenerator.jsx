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


const CoverLetterGenerator = () => {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide information about the position you're applying for</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label >Company Name</Label>
                        <Input type="text" placeholder="Enter company name" />
                    </div>
                    <div>
                        <Label >Company Name</Label>
                        <Input type="text" placeholder="Enter company name" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex  items-center justify-end">
                    <Button>Generate cover letter</Button>
                </div>
            </CardFooter>
        </Card>

    </div>
  )
}

export default CoverLetterGenerator