import { NextResponse } from "next/server";

const secretKey =
  process.env.NEXT_PUBLIC_KOMOJU_SECRET_KEY || "PASTE_YOUR_SECRET_KEY";

export async function POST(req: Request) {
  try {
    // Read raw body safely
    const rawBody = await req.text();

    if (!rawBody) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    // Parse JSON manually to avoid syntax errors
    let bodyData;
    try {
      bodyData = JSON.parse(rawBody);
    } catch (parseError) {
      console.error("Invalid JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { amount } = bodyData;
    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    // Detect protocol + host for return URL
    const proto = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    const returnUrl = `${proto}://${host}/api/payments/payment-successfull`;

    // Call Komoju API
    const response = await fetch("https://komoju.com/api/v1/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(secretKey + ":").toString(
          "base64"
        )}`,
      },
      body: JSON.stringify({
        amount,
        currency: "JPY",
        return_url: returnUrl,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Komoju API error:", errorBody);
      return NextResponse.json(
        { error: "Failed to create Komoju session" },
        { status: 500 }
      );
    }

    const session = await response.json();
    console.log("Komoju Session Created:", session);

    return NextResponse.json({ sessionUrl: session.session_url });
  } catch (error) {
    console.error("Error creating Komoju session:", error);
    return NextResponse.json(
      { error: "Unexpected server error occurred" },
      { status: 500 }
    );
  }
}
