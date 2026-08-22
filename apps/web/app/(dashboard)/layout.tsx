import { SideBar } from "../components/SideBar";

export default function  Layout({
    children
}:{
    children:React.ReactNode;
}): React.ReactElement {

 return (
    <div className="flex  min-h-screen w-full flex-1 ">
        <div  className="shrink-0 pt-35 px-10 border-r">
           <div className="pb-10">
             <SideBar href={"/dashboard"} Icon={<HomeIcon/>} title="Home" />
            <SideBar href={"/transfer"} Icon={<TransferIcon/>} title="Transfer"/>
            <SideBar href={"/transactions"} Icon={<TransactionIcon/>} title="Transactions"/>
            <SideBar href={"/p2p_Transfer"} Icon={<P2PTransferIcon/>} title="P2P Transfer"/>
           </div>
        </div>
       <main className="min-w-0 flex-1">
            {children}
        </main>
    </div>
 )

}

function HomeIcon(){
     return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}

function TransferIcon(){
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
}

function P2PTransferIcon(){
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
              className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>
}