"use client"

import {Button} from "@repo/ui/button";
import {Card}    from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textInput";
import {useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createOnRampTransactions } from "../lib/actions/createOnRamps";


const SUPPORTED_BANKS=[{
    name:"HDFC Bank",
    redirectUrl:"https://netbanking.hdfcbank.com"
},{
    name:"Axis Bank",
    redirectUrl:"https://www.axisbank.com/"
}];

export const AddMoney=()=>{
    const [redirectUrl,setRedirectUrl]=useState<string>(SUPPORTED_BANKS[0]?.redirectUrl ?? "");
    const [amount,setAmount]=useState<number>(0);
    const [provider,setProvider]=useState<string>(SUPPORTED_BANKS[0]?.name ?? "");

    const {data:session}=useSession();
    const token=crypto.randomUUID;
    const router=useRouter();

  

    return <Card title="Add Money">
       <div className="pt-2">
           <TextInput label={"Amount"} placeholder={"Amount"}  onChange={(value)=>{
            setAmount(value ? Number(value) : Number)
           }}/>
           <div className="py-4 text-left">
            Bank 
           </div>

           <Select onSelect={(value)=>{
            setRedirectUrl(SUPPORTED_BANKS.find(x=>x.name==value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x=>x.name==value)?.name || "")
           }} options={SUPPORTED_BANKS.map(x=>({
            key:x.name,
            value:x.name 
           }))} />

           <div className=" flex justify-center items-center pt-5">
              <Button onClick={async()=>{
                 try{
                  await createOnRampTransactions(amount,provider)
                  router.refresh();
                 } catch(e){
                    console.log(e);
                 }
              }}>
                 Add Money
              </Button>
           </div>
       </div>


    </Card>
}
