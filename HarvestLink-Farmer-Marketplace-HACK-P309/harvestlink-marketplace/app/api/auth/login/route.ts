import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const data = z
      .object({
        email: z.string().email(),
        password: z.string().min(1),
        role: z.enum(["farmer", "buyer"]).optional(),
      })
      .parse(await req.json());

    await connectDB();
    const user = await User.findOne({ email: data.email.toLowerCase() });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // The selected role is only a login check. Permissions always come from
    // the role stored on the user's account, never from the submitted form.
    if (user.role !== "admin" && data.role && user.role !== data.role) {
      const actualRole = user.role === "farmer" ? "Farmer" : "Buyer";
      return NextResponse.json(
        {
          error: `This account is registered as a ${actualRole}. Please select ${actualRole} to log in.`,
        },
        { status: 403 }
      );
    }

    await createSession({
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({ user: { name: user.name, role: user.role } });
  } catch (error: unknown) {
    const message =
      error instanceof z.ZodError
        ? error.issues[0]?.message
        : "Login failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
