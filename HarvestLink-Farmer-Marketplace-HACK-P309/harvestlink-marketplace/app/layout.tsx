import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata: Metadata = { title: "HarvestLink — Farm to Neighbourhood", description: "A transparent marketplace connecting local farmers directly with buyers." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><Navbar />{children}<footer className="border-t border-[#e6ebe3] mt-20 py-8 text-center text-sm muted">HarvestLink · Grow local. Buy fresh. Keep value with farmers.</footer></body></html>; }