import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth"
import P2PCard from "../../components/p2pCard"
import P2PCardTransfers from "../../components/p2pRecentTransfers"

 async function getTransfers(){
      const session=await getServerSession(authOptions);
      const transfers=await prisma.p2pTransfer.findMany({
        where:{
            fromUserId:session?.user.id,
        }
      })
      return transfers.map(t=>({
        amount:t.amount,
        fromUserId:t.fromUserId,
        toUserId:t.toUserId,
        timestamp:t.timestamp,     
      }))
 }
export default async function () {

    const transactions=await getTransfers();

    return (
        <div className="flex justify-center items-center gap-6 p-10">
                <P2PCard />
                <P2PCardTransfers transactions={transactions}/>
          
        </div>
    )
}
