import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveResume(content) {

    const { userId } = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId,
        },
    })

    if(!user) throw new Error("User not found");
        
    try {
        const resume = await db.resume.upsert({
            where :{
                userId : user.id
            },
            update :{
                content
            },
            create : {
                userId :user.id,
                content, 
            }
        });

        revalidatePath('/resume');
        return resume;

    } catch (error) {
        console.error("Error saving resume : ", error);
        throw new Error("Failed to save resume!")
    }

}


export async function getResume() {
    const { userId } = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId,
        },
    })

    if(!user) throw new Error("User not found");

    try {
        const resume = await db.resume.findUnique({
            where : {
                userId : user.id
            }
        })
        return resume;
    } catch (error) {
        console.error("Error getting resume : ", error);
        throw new Error("Failed to get resume!")
    }
}
