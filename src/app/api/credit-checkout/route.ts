import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { UserSessionToSSR } from "@/lib/core/session";

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await req.formData();

    const credits = Number(formData.get("credits"));
    const priceUsd = Number(formData.get("priceUsd"));

    if (!credits || !priceUsd) {
      return NextResponse.json(
        { error: "Invalid credit package" },
        { status: 400 }
      );
    }

    const user = await UserSessionToSSR();

    if (!user) {
      return NextResponse.redirect(`${origin}/login`, 303);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      customer_email: user.email,

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency: "usd",

            unit_amount: priceUsd * 100,

            product_data: {
              name: `${credits} Credit Package`,
              description: `Purchase ${credits} credits for ZendaFund`,
            },
          },
        },
      ],

      metadata: {
        supporterEmail: user.email,
        supporterName: user.name,
        credits: String(credits),
        amountUsd: String(priceUsd),
      },

      success_url: `${origin}/dashboard/supporter/credits/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/dashboard/supporter/credits`,
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}