import prisma from '@repo/db/client'
import bcrypt from "bcrypt"

async function main(){

 

    const alice=await prisma.user.upsert({
        
        where:{email:'abc@example.com'},
        update:{},
        create:{
            username:"abc",
            email:"abc@example.com",
            password: "SanthoshRaju",
            balance:{
                create:{
                    amount:20000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    amount:20000,
                    token:"token__1",
                    provider:"HDFC Bank"
                }
            },
        }
    });

}

main()

