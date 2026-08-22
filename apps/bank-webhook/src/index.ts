import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });
import express from "express"
import prisma from "@repo/db/client"; 
import cors from "cors"

const app=express();

app.use(cors({
   origin:"http://localhost:3000",
   methods:["POST"],
}));

app.use(express.json());

app.post('/hdfcwebhook',async (req,res)=>{
    const {token,amount,user_identifier}=req.body;

    
    try {
        const value= await prisma.onRampTransaction.findUnique({
        where:{
            token:token
          }
       })

         if (!value) {
      return res.status(404).json({
        msg: "Transaction not found",
       });
    }

  if(value.status=="Processing"){

        await prisma.$transaction([
             prisma.onRampTransaction.update({
                where:{
                    token:token
                },
                data:{
                    status:"Success",
                }
               
            }),

            prisma.balance.updateMany({
                where:{
                    userId:user_identifier
                },
                data:{
                    amount:{
                        increment:amount
                    }
                }
            }),
       
            
        ]);
    } else {
        res.status(200).json({
            msg:"Transaction already success",
        })
    }
       

        res.status(200).json({
            msg:"Done",
        })
    }
     catch(e){
        console.log(e)
        res.status(411).json({
            msg:"Not Done",
        })
     }

})

app.listen(4001);