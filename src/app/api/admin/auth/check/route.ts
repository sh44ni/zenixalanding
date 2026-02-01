import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin-session");

    if (!adminSession?.value) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
}
