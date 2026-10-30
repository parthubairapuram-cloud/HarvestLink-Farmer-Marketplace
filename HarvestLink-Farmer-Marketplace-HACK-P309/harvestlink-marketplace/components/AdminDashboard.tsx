 "use client";
import {useState} from "react";
type P={_id:string;name:string;category:string;quantity:number;unit:string;price:number;location:string;status:string;farmer?:{name:string;farmName?:string}};
export default function AdminDashboard({products}:{products:P[]}){
 const [rows,setRows]=useState(products),[busy,setBusy]=useState("");
 async function moderate(id:string,status:"active"|"hidden"){
  setBusy(id);const r=await fetch(`/api/products/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})});
  if(r.ok)setRows(old=>old.map(p=>p._id===id?{...p,status}:p));setBusy("");
 }
 return <div className="card overflow-hidden mt-8"><div className="p-5 border-b border-[#edf0eb]"><h2 className="font-black text-xl">Listing moderation</h2><p className="muted text-sm mt-1">Hide duplicate or inappropriate listings, or restore valid listings.</p></div>{rows.length===0?<p className="p-8 muted text-center">No listings to moderate.</p>:rows.map(p=><div key={p._id} className="p-5 border-b last:border-0 border-[#edf0eb] flex flex-col md:flex-row md:items-center justify-between gap-3"><div><b>{p.name}</b><p className="text-sm muted">{p.category} · {p.quantity} {p.unit} · ₹{p.price}/{p.unit} · {p.location}</p><p className="text-xs muted mt-1">Farmer: {p.farmer?.farmName||p.farmer?.name||"Unknown"} · {p.status}</p></div><button disabled={busy===p._id} onClick={()=>moderate(p._id,p.status==="active"?"hidden":"active")} className="btn btn-light !py-2 !px-4 text-sm">{p.status==="active"?"Hide listing":"Restore listing"}</button></div>)}</div>;
}