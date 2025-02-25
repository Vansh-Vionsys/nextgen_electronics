import uploadCloudinary from "@/helpers/uploadCloudinary";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import { IProduct } from "@/types/product.types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Product add API with Cloudinary image uploads
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Parse form-data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const stock = parseInt(formData.get("stock") as string);
    const ratings = parseFloat(formData.get("ratings") as string);

    if (
      !name ||
      !description ||
      isNaN(price) ||
      !category ||
      isNaN(stock) ||
      isNaN(ratings)
    ) {
      return NextResponse.json(
        { error: "Please fill all required fields correctly" },
        { status: 400 }
      );
    }

    // Get images from formData
    const imagesFiles = formData.getAll("images") as File[];
    if (!imagesFiles.length) {
      return NextResponse.json(
        { error: "Please upload at least one image" },
        { status: 400 }
      );
    }

    // Convert files to Buffers
    const imageBuffers = await Promise.all(
      imagesFiles.map(async (file, index) => {
        console.log(
          `Processing image ${index + 1}: ${file.name}, size: ${file.size}`
        );
        const arrayBuffer = await file.arrayBuffer();
        return Buffer.from(arrayBuffer);
      })
    );

    // Upload images to Cloudinary
    const uploadedImages = await uploadCloudinary(imageBuffers, "products");
    console.log("Uploaded images:", uploadedImages);

    // Create new product with uploaded images
    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      ratings,
      images: uploadedImages,
    }).catch((err) => {
      console.error("MongoDB insert error:", err);
      throw new Error("Failed to insert product into database");
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/products:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
