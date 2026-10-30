import Link from "next/link";
import { getSession } from "@/lib/auth";
export default async function Navbar() {
 const user = await getSession();
 return <header className="bg-[#fbfcf8]/95 backdrop-blur border-b border-[#e8eee6] sticky top-0 z-30"><div className="container h-[76px] flex items-center justify-between">
 <Link href="/" className="flex items-center gap-2"><span className="w-10 h-10 rounded-2xl bg-[#1f6b4a] text-white grid place-items-center text-xl">✳</span><span className="font-black tracking-tight text-xl">harvest<span className="text-[#1f6b4a]">link</span><small className="block text-[9px] tracking-[.2em] muted font-bold -mt-1">FARM TO NEIGHBOURHOOD</small></span></Link>
 <nav className="flex items-center gap-5 text-sm font-semibold"><Link href="/market" className="hover:text-[#1f6b4a]">Marketplace</Link>{user ? <><Link href="/dashboard" className="hover:text-[#1f6b4a]">Dashboard</Link><form action="/api/auth/logout" method="post"><button className="btn btn-light !py-2 !px-4">Sign out</button></form></> : <><Link href="/login" className="hover:text-[#1f6b4a]">Log in</Link><Link href="/register" className="btn btn-primary !py-2 !px-4">Join HarvestLink</Link></>}</nav>
 </div></header>;
}