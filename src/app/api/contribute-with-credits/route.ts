import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { UserSessionToSSR } from "@/lib/core/session";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await req.formData();

    const campaignId = formData.get("campaignId") as string;
    const campaignTitle = formData.get("campaignTitle") as string;
    const creatorName = formData.get("creatorName") as string;
    const creatorEmail = formData.get("creatorEmail") as string;
    const amount = Number(formData.get("amount"));

    if (!campaignId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid contribution data" },
        { status: 400 }
      );
    }

    const user = await UserSessionToSSR();

    if (!user) {
      return NextResponse.redirect(`${origin}/login`, 303);
    }

    // Backend Route-এ Redirect
    const params = new URLSearchParams({
      campaignId,
      campaignTitle,
      creatorName,
      creatorEmail,
      amount: String(amount),
    });

    return NextResponse.redirect(
      `${origin}/dashboard/supporter/contribute-with-credits?${params.toString()}`,
      303
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}