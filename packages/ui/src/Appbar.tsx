import { Button } from "./button";

interface AppbarProps{
    user?:{
        name?:string | null;
    },
    onSignin:any,
    onSignout:any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}:AppbarProps) => {
    return <div className="flex justify-between border-b-1 border-black-800 px-4">
        <div className="text-xl flex flex-col justify-center text-[#002970] font-bold tracking-wide px-7 py-3">
            PayTM
        </div>
        <div className="py-2 px-7">
            <Button onClick={user?onSignin:onSignout}>{user?"Logout":"Login"}</Button>
        </div>
    </div>
}