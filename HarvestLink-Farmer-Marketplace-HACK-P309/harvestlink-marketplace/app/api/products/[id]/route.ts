import {NextResponse} from "next/server";
import {z} from "zod";
import {connectDB} from "@/lib/db";
import {getSession} from "@/lib/auth";
import Product from "@/models/Product";
export async function PATCH(req:Request,{params}:{params:{id:string}}){
 try{
  const s=await getSession();
  if(!s)return NextResponse.json({error:"Please log in."},{status:401});
  if(s.role!=="admin")return NextResponse.json({error:"Admin access required."},{status:403});
  const {status}=z.object({status:z.enum(["active","hidden"])}).parse(await req.json());
  await connectDB();
  const p=await Product.findByIdAndUpdate(params.id,{status},{new:true});
  if(!p)return NextResponse.json({error:"Listing not found."},{status:404});
  return NextResponse.json({product:p});
 }catch(e:any){return NextResponse.json({error:e.issues?.[0]?.message||"Moderation failed."},{status:400});}
}
