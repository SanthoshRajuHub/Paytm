
import { Card } from "@repo/ui/card"

export default function p2pTransfers(
    {transactions}:{
    transactions:{
        amount:number,
        fromUserId:string,
        toUserId:string,
        timestamp:Date
    }[]
}){

    return (
        <div>
           <Card  title="History">
             <div className="py-2">
            {transactions.map(t=><div className="flex  justify-between">

                        <div >
                                <div className="text-sm">
                                    Received From
                                </div>
                                <div>
                                    Name
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timestamp.toDateString()}
                                </div>
                        </div>
                        <div>
                                +Rs {t.amount/100}
                        </div>

                    </div>
                    )}
             </div>
           </Card>
        </div>
    )
}