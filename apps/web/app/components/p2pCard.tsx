"use client"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react";
import { Button } from "@repo/ui/button";
import p2ptransfer from "../lib/actions/p2ptransfer";




export default function p2pCard():React.ReactElement{
      const [number,setNumber]=useState<string>("");
      const [amount,setAmount]=useState<number>(0);
    return <div>
                <Card title="Send" >
                    <TextInput placeholder="Enter Number" label="Number" onChange={(value)=>setNumber(value.toString())}></TextInput>
                    <TextInput placeholder="Enter Amount" label="Amount" onChange={(value)=>setAmount(Number(value))}></TextInput>
                    <div className="flex pt-5 pl-10"><Button onClick={async()=>{
                        await p2ptransfer(number,amount)
                    }}> Send </Button></div>
               </Card>
    </div>
}