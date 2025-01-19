import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { type Address } from "~/lib/types";
import { api } from "~/trpc/server";

// Initialize  Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

interface RawBody {
  cartItems: CheckoutItem[];
  userId: string;
  address: Address;
}

type CheckoutItem = {
  id: string;
  quantity: number;
  name: string;
  price: number; // Price in pounds
};

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { cartItems, userId } = (await req.json()) as RawBody;

    // Validate the structure of the request body
    if (!cartItems || !Array.isArray(cartItems)) {
      console.error("Invalid request body:", cartItems);
      return NextResponse.json(
        { error: "Invalid request format. Expected 'cartItems' array." },
        { status: 400 },
      );
    }

    // Transform the items into Stripe's expected format
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert price from pounds to pence
      },
      quantity: item.quantity,
    }));

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: [
          "AC",
          "AD",
          "AE",
          "AF",
          "AG",
          "AI",
          "AL",
          "AM",
          "AO",
          "AQ",
          "AR",
          "AT",
          "AU",
          "AW",
          "AX",
          "AZ",
          "BA",
          "BB",
          "BD",
          "BE",
          "BF",
          "BG",
          "BH",
          "BI",
          "BJ",
          "BL",
          "BM",
          "BN",
          "BO",
          "BQ",
          "BR",
          "BS",
          "BT",
          "BV",
          "BW",
          "BY",
          "BZ",
          "CA",
          "CD",
          "CF",
          "CG",
          "CH",
          "CI",
          "CK",
          "CL",
          "CM",
          "CN",
          "CO",
          "CR",
          "CV",
          "CW",
          "CY",
          "CZ",
          "DE",
          "DJ",
          "DK",
          "DM",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "EH",
          "ER",
          "ES",
          "ET",
          "FI",
          "FJ",
          "FK",
          "FO",
          "FR",
          "GA",
          "GB",
          "GD",
          "GE",
          "GF",
          "GG",
          "GH",
          "GI",
          "GL",
          "GM",
          "GN",
          "GP",
          "GQ",
          "GR",
          "GS",
          "GT",
          "GU",
          "GW",
          "GY",
          "HK",
          "HN",
          "HR",
          "HT",
          "HU",
          "ID",
          "IE",
          "IL",
          "IM",
          "IN",
          "IO",
          "IQ",
          "IS",
          "IT",
          "JE",
          "JM",
          "JO",
          "JP",
          "KE",
          "KG",
          "KH",
          "KI",
          "KM",
          "KN",
          "KR",
          "KW",
          "KY",
          "KZ",
          "LA",
          "LB",
          "LC",
          "LI",
          "LK",
          "LR",
          "LS",
          "LT",
          "LU",
          "LV",
          "LY",
          "MA",
          "MC",
          "MD",
          "ME",
          "MF",
          "MG",
          "MK",
          "ML",
          "MM",
          "MN",
          "MO",
          "MQ",
          "MR",
          "MS",
          "MT",
          "MU",
          "MV",
          "MW",
          "MX",
          "MY",
          "MZ",
          "NA",
          "NC",
          "NE",
          "NG",
          "NI",
          "NL",
          "NO",
          "NP",
          "NR",
          "NU",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PF",
          "PG",
          "PH",
          "PK",
          "PL",
          "PM",
          "PN",
          "PR",
          "PS",
          "PT",
          "PY",
          "QA",
          "RE",
          "RO",
          "RS",
          "RU",
          "RW",
          "SA",
          "SB",
          "SC",
          "SE",
          "SG",
          "SH",
          "SI",
          "SJ",
          "SK",
          "SL",
          "SM",
          "SN",
          "SO",
          "SR",
          "SS",
          "ST",
          "SV",
          "SX",
          "SZ",
          "TA",
          "TC",
          "TD",
          "TF",
          "TG",
          "TH",
          "TJ",
          "TK",
          "TL",
          "TM",
          "TN",
          "TO",
          "TR",
          "TT",
          "TV",
          "TW",
          "TZ",
          "UA",
          "UG",
          "US",
          "UY",
          "UZ",
          "VA",
          "VC",
          "VE",
          "VG",
          "VN",
          "VU",
          "WF",
          "WS",
          "XK",
          "YE",
          "YT",
          "ZA",
          "ZM",
          "ZW",
          "ZZ",
        ],
      },
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/cancel`, // Add product IDs to the cancel URL
    });

    // Save the order to the Prisma database
    const totalAmount = cartItems.reduce(
      (total, item) => total + Math.round(item.price * 100) * item.quantity,
      0,
    );

    if (session.payment_intent === "succeeded") {
      await api.order.create({
        userId,
        pricePaid: totalAmount, // Price in smallest currency unit (pence)
        productIds: cartItems.map((item) => item.id),
      });
    }

    // Return the session URL
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Error creating Stripe session:", error);

    return NextResponse.json(
      { error: "Failed to create Stripe session." },
      { status: 500 },
    );
  }
}
