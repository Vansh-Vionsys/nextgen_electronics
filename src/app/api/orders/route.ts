import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect"; // Assuming you renamed it to match your first code
import { razorInstance } from "@/lib/razorInstance"; // Use the same Razorpay instance as in the reference
import Order from "@/models/order.model";
import Voucher from "@/models/voucher.model"; // If you need voucher functionality
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Check for authenticated user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    // Parse request body
    const {
      items,
      address,
      totalAmount,
      voucherAmount = 0,
      voucherId,
    } = await req.json();

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Items are required" },
        { status: 400 }
      );
    }
    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }
    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "Valid total amount is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Adjust total amount if voucher is applied
    const adjustedAmount = totalAmount - (voucherAmount || 0);
    if (adjustedAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount after voucher" },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const razorpayOrder = await razorInstance.orders.create({
      amount: Math.round(adjustedAmount * 100), // Convert to paise
      currency: "INR",
      receipt: `receipt-${Date.now()}`,
      notes: {
        userId: session.user.id.toString(),
      },
    });

    // Create new order in the database
    const newOrder = await Order.create({
      user: session.user.id, // Use 'user' instead of 'userId' as per your schema
      items: items.map((item: any) => ({
        product: item.product, // Ensure this is a valid ObjectId
        quantity: item.quantity,
      })),
      address: {
        name: address.name,
        phone: address.phone,
        addressLine: address.addressLine,
        city: address.city,
        zipCode: address.zipCode,
      },
      totalAmount: adjustedAmount, // Store the adjusted amount
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "pending", // Default as per schema
      deliveryStatus: "processing", // Default as per schema
    });

    // If a voucher is applied, update voucher count
    if (voucherAmount > 0 && voucherId) {
      await Voucher.findOneAndUpdate(
        { _id: voucherId },
        { $inc: { voucherNumber: -1 } }
      );
    }

    // Return response with necessary details
    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      dbOrderId: newOrder._id,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
