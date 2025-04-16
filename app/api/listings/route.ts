import { NextRequest, NextResponse } from "next/server";
import { getListings } from "@/lib/listings";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const region = searchParams.get("region") || undefined;
    const country = searchParams.get("country") || undefined;
    const featured = searchParams.get("featured") === "true";
    const status = searchParams.get("status") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const listings = await getListings({
      category,
      region,
      country,
      featured,
      status,
      page,
      limit,
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
} 