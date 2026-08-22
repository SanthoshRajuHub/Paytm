"use server"
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client"

export default async function p2ptransfer(to:string,amount:number){
      const session=await getServerSession(authOptions);
      const from=session?.user.id;

      if (!from) {
         throw new Error("User is not authenticated");
        }

      const toUser=await prisma.user.findUnique({
        where:{
            number:to
        }
      })


        if (!toUser) {
            throw new Error("Recipient not found");
        }



      const fromUserAmount=await prisma.balance.findUnique({
        where:{
            userId:from
        }
      })
            if (!fromUserAmount || fromUserAmount.amount < amount) {
                throw new Error("Insufficient balance");
            }
    
        await prisma.$transaction([

           prisma.$queryRaw `SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE`,

            prisma.balance.update({
                where:{
                    userId:from,
                },
                data:{
                    amount:{
                        decrement:amount
                    }
                }
            }),

            prisma.balance.update({
                where:{
                    userId:toUser.id,
                },
                data:{
                    amount:{
                        increment:amount
                    }
                }
            }),

            prisma.p2pTransfer.create({
                data:{
                    amount:amount,
                    timestamp:new Date(),
                    fromUserId:from,
                    toUserId:toUser.id
                }
            }),

          
        ])

      
    }