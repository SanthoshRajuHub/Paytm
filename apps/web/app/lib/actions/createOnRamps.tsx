"use server"

import { getServerSession } from "next-auth";
import {authOptions} from '../auth'
import prisma from "@repo/db/client";

export async function createOnRampTransactions(amount:number,provider:string){

     const session=await getServerSession(authOptions);
     const token= Math.random().toString();
     const userId=session?.user.id;

     if(!userId){
        return {
            msg:"User not logged in"
        }
     }
    
     try{
        await prisma.$transaction([
            prisma.balance.upsert({
                where:{
                    userId:userId
                },
                update:{
                    amount:{
                        increment:amount
                    }
                },
                create:{
                    userId:userId,
                    amount:amount,
                    locked:0,
                }
            }),
        
           prisma.onRampTransaction.create({
                    data: {
                        userId:userId,
                        startTime: new Date(),
                        status: "Processing",
                        provider:provider,
                        amount:amount,
                        token:token
                    },
          })

        ])

        }catch(e){
            console.log(e);
            msg:"Transaction Not Done"
        }

    return {
        msg:"On Ramp Transactions added"
    }
}