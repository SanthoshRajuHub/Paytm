"use client"
import {redirect, usePathname,useRouter} from "next/navigation"


export const  SideBar=({
    href,
    Icon,
    title
}:{
    href:string,
    Icon:React.ReactNode,
    title:string
})=>{
   
    const router=useRouter();
    const pathname=usePathname();
    const selected=pathname===href;

    return <div className={ `flex ${selected? "text-[#6a51a6]":"text-slate-500"} cursor-pointer   py-3 `} onClick={()=>{
        router.push(href);
    }}>
        <div>
           {Icon}
        </div>

        <div className={`flex ${selected?"text-[#6a51a6]":"text-slate-500"} cursor-pointer px-2 `}>
            {title}
        </div>

    </div>

}