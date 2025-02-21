import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import { IProduct } from "@/types/product.types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// add product
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin")
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    await dbConnect();

    const body: IProduct = await req.json();

    if (!body.name || !body.description || !body.price) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 }
      );
    }
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// get all products
// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
