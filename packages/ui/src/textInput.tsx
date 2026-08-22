"use client"

export const TextInput=({
    placeholder,
    label,
    onChange
}:{
    placeholder:string;
    label:string;
    onChange:(value:number)=>void;
})=>{
    return <div className="pt-2">
        <label className="block mb-2 text-sm text-gray-900">{label}</label>
        <input  onChange={(e)=>onChange(Number(e.target.value))} type="number" className="border border-black-900 text-sm rounded-lg  focus:border-blue-400 block w-full p-2.5 " placeholder={placeholder}/>
    </div>
}