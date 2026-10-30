import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) throw new Error("JWT_SECRET must be configured in production.");
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "development-only-secret-change-this-now-123456");
export type Session = { id: string; name: string; email: string; role: "farmer" | "buyer" | "admin" };
export async function createSession(user: Session) {
  const token = await new SignJWT(user).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
  cookies().set("harvestlink_session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function getSession(): Promise<Session | null> {
  const token = cookies().get("harvestlink_session")?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, secret); return payload as unknown as Session; } catch { return null; }
}
export function clearSession() { cookies().delete("harvestlink_session"); }