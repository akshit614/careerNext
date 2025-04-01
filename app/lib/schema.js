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