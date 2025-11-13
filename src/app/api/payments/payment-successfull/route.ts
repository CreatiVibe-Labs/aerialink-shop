import { NextResponse } from "next/server";

const secretKey =
  process.env.NEXT_PUBLIC_KOMOJU_SECRET_KEY || "PASTE_YOUR_SECRET_KEY";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionID = searchParams.get("session_id");

  if (!sessionID) {
    return new Response("Invalid session ID", { status: 400 });
  }

  try {
    const response = await fetch(
      `https://komoju.com/api/v1/sessions/${sessionID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from(secretKey + ":").toString(
            "base64"
          )}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Komoju API error:", text);
      return new Response("Failed to fetch session details", { status: 500 });
    }

    const session = await response.json();
    console.log("Komoju Session Data:", session);

    // Redirect user based on payment result
    if (session.status === "completed") {
      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/checkout/order-confirmation?status=success&payment_status=${
          session.payment?.status || "completed"
        }&session=${encodeURIComponent(JSON.stringify(session))}`
      );
    } else {
      console.log("payment error");

      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/order-failed?status=failed`
      );
    }
  } catch (error) {
    console.error("Error verifying Komoju session:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
