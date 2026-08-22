import React from "react"

interface cardProps{
    title:string,
    children?:React.ReactNode
}
export const Card=({
    title,
    children,
}:{
    title:string;
    children?:React.ReactNode;
}): React.ReactElement => {
    return (
        <div className="border p-4 bg-white rounded-xl bg-[#ededed]">
           <h1 className="text-xl border-b border-slate-500 pb-2">
            {title}
           </h1>
           {children}
        </div>
    )
}