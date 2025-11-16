import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const secretKey =
  process.env.NEXT_PUBLIC_KOMOJU_SECRET_KEY || "PASTE_YOUR_SECRET_KEY";

async function createOrder(session: any) {
  try {
    const metadata = session.metadata || {};
    const cartItems = JSON.parse(metadata.cart_items || "[]");
    
    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    // Calculate amounts from session
    const orderAmount = parseFloat(session.amount) || 0;
    const taxAmount = parseFloat(metadata.tax_amount || "0");
    const shippingAmount = parseFloat(metadata.shipping_amount || "0");
    const discount = 0;
    const total = orderAmount;

    // Prepare items array with product_id and variant_id (size)
    // If size_id is missing, try to fetch it from the API
    const items = await Promise.all(
      cartItems.map(async (item: any) => {
        let variantId = item.size_id || null;
        
        // If size_id is null, try to fetch product and find variant by size
        if (!variantId && item.size && item.room_type) {
          try {
            const productResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}`
            );
            
            if (productResponse.ok) {
              const productData = await productResponse.json();
              const product = productData.product || productData;
              
              // Find matching variant
              if (product.variants && Array.isArray(product.variants)) {
                const matchingVariant = product.variants.find((v: any) => {
                  // Check if variant has sizes structure
                  if (v.sizes && v.sizes[item.room_type]) {
                    return v.sizes[item.room_type].some(
                      (s: any) => s.size_value === item.size
                    );
                  }
                  // Check if variant has attributes
                  if (v.attributes && Array.isArray(v.attributes)) {
                    const sizeAttr = v.attributes.find((attr: any) =>
                      attr.attribute_name.toLowerCase().includes('size')
                    );
                    const typeAttr = v.attributes.find((attr: any) =>
                      attr.attribute_name.toLowerCase().includes('type') ||
                      attr.attribute_name.toLowerCase().includes('category')
                    );
                    return (
                      sizeAttr?.attribute_value === item.size &&
                      typeAttr?.attribute_value === item.room_type
                    );
                  }
                  return false;
                });
                
                if (matchingVariant) {
                  variantId = matchingVariant.id;
                }
              }
            }
          } catch (error) {
            // Silent error handling
          }
        }
        
        return {
          product_id: item.id,
          variant_id: variantId,
          quantity: item.quantity,
        };
      })
    );

    // Prepare order data
    const orderData = {
      payment_method: "komoju",
      items: items,
      coupon_code: null,
      name: metadata.customer_name || "Guest User",
      email: metadata.customer_email || "",
      phone_number: metadata.customer_phone || "",
      address1: metadata.customer_address || "",
      postal_code: metadata.customer_postal_code || "",
      session_id: session.id,
      currency: session.currency || "JPY",
      payment_obj: {
        transaction_id: session.payment?.id || session.id,
        status: session.payment?.status || "completed",
        payment_method: session.payment?.payment_method_type || session.payment?.payment_details?.type || "komoju",
      },
      order_amount: orderAmount,
      tax_amount: taxAmount,
      shipping_amount: shippingAmount,
      discount: discount,
      total: total,
      save_info: metadata.save_info === "true" && !token, // Only save if guest and checkbox checked
    };

    // Create order via API
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add auth token if user is logged in
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const orderResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/guest/orders`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(orderData),
      }
    );

    if (!orderResponse.ok) {
      const errorText = await orderResponse.text();
      
      // Include both error and payload in the error message
      const errorWithPayload = JSON.stringify({
        error: errorText,
        status: orderResponse.status,
        statusText: orderResponse.statusText,
        payload: orderData,
      });
      
      throw new Error(`Order API Error (${orderResponse.status}): ${errorWithPayload}`);
    }

    const orderResult = await orderResponse.json();
    return orderResult;
  } catch (error) {
    throw error;
  }
}

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
      return new Response("Failed to fetch session details", { status: 500 });
    }

    const session = await response.json();

    // Redirect user based on payment result
    if (session.status === "completed") {
      // Create order before redirecting
      let orderData = null;
      try {
        const orderResult = await createOrder(session);
        orderData = orderResult.data; // Get the order data from backend response
      } catch (orderError) {
        // Redirect to error page with detailed error message
        const errorMessage = orderError instanceof Error ? orderError.message : "Unknown error";
        return NextResponse.redirect(
          `${
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
          }/order-failed?status=error&error=${encodeURIComponent(errorMessage)}`
        );
      }

      // Build URL with order details from backend
      const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/order-confirmation`;
      const params = new URLSearchParams({
        status: 'success',
        payment_status: session.payment?.status || "completed",
        order_id: String(orderData?.order_id || ''),
        order_number: String(orderData?.order_number || ''),
        created_at: String(orderData?.created_at || ''),
        full_name: String(orderData?.full_name || ''),
        total_amount: String(orderData?.total_amount || ''),
        payment_method: String(orderData?.payment_method || ''),
        payment_type: String(orderData?.payment_type || ''),
        clear_cart: 'true', // Flag to clear cart
      });

      return NextResponse.redirect(`${baseUrl}?${params.toString()}`);
    } else {
      return NextResponse.redirect(
        `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/order-failed?status=failed`
      );
    }
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
