import {z} from "zod";


export const onboardingSchema = z.object({
    industry : z.string({
        required_error : "Please select an industry",
    }),

    subIndustry : z.string({
        required_error : "Please select an specialization"
    }),

    bio : z.string().max(500).optional(),
    experience : z.string()
    .transform((val) => parseInt(val,10))
    .pipe(
        z.number()
        .min(0, "Minimum experience should be at least 0 year")
        .max(50, "Max experience can be 50 years only")
    ),

    skills : z.string().transform((val) => 
        val ? 
            val.split()
            .map((skill)=> skill.trim())
            .filter(Boolean)

            : undefined)
})


export const contactSchema = z.object({
    email : z.string().email("Invalid email"),
    mobile : z.string().optional(),
    twitter : z.string().optional(),
    linkedin : z.string().optional(),
})

export const entrySchema = z.object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Organization is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    current: z.boolean().default(false),
}).refine((data)=> {
    if(!data.current && !data.endDate) {
        return false
    }return true;
    },
    {
        message : "End date is required unless your current position",
        path : ["endDate"],
    }
)


export const resumeSchema = z.object({
    contactInfo : contactSchema,
    summary : z.string().min(1, "Professional summary is required"),
    skills : z.string().min(1,"skills are required"),
    experience : z.array(entrySchema),
    education : z.array(entrySchema),
    projects : z.array(entrySchema),
})