import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { UserSessionToSSR } from "@/lib/core/session";
import { creditsToUsd } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await req.formData();
    const campaignId = formData.get("campaignId") as string;
    const campaignTitle = formData.get("campaignTitle") as string;
    const creatorName = formData.get("creatorName") as string;
    const creatorEmail = formData.get("creatorEmail") as string;
    const amountInCredits = Number(formData.get("amount"));

    if (!campaignId || !amountInCredits || amountInCredits <= 0) {
      return NextResponse.json(
        { error: "Invalid contribution data" },
        { status: 400 },
      );
    }

    const user = await UserSessionToSSR();
    if (!user) {
      return NextResponse.redirect(`${origin}/login`, 303);
    }

    const amountInUsd = creditsToUsd(amountInCredits);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Contribution to ${campaignTitle}` },
            unit_amount: Math.round(amountInUsd * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      metadata: {
        campaignId,
        campaignTitle,
        creatorName,
        creatorEmail,
        supporterEmail: user.email,
        supporterName: user.name,
        paymentMethod: "card",
      },
      success_url: `${origin}/explore/${campaignId}/contribute-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/explore/${campaignId}`,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
