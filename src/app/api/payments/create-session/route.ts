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

    const { 
      amount, 
      fullName, 
      email, 
      phone, 
      address, 
      postalCode, 
      saveInfo,
      cartItems,
      shippingAmount,
      taxAmount,
      subtotal
    } = bodyData;
    
    console.log("=== CREATE PAYMENT SESSION ===");
    console.log("Amount:", amount);
    console.log("Shipping:", shippingAmount);
    console.log("Tax:", taxAmount);
    console.log("Subtotal:", subtotal);
    console.log("Cart Items:", JSON.stringify(cartItems, null, 2));
    console.log("Customer:", { fullName, email, phone, address, postalCode, saveInfo });
    
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

    // Store order details in session metadata
    const metadata = {
      customer_name: fullName,
      customer_email: email,
      customer_phone: phone,
      customer_address: address,
      customer_postal_code: postalCode,
      save_info: saveInfo ? "true" : "false",
      cart_items: JSON.stringify(cartItems || []),
      shipping_amount: String(shippingAmount || 0),
      tax_amount: String(taxAmount || 0),
      subtotal: String(subtotal || 0),
    };

    console.log("Session Metadata:", JSON.stringify(metadata, null, 2));

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
        metadata,
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
