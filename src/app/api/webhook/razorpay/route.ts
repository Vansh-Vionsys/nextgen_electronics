import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import { failedEmailTemplate, successEmailTemplate } from "@/mail/templates";
import sendMail from "@/mail";

export async function POST(req: NextRequest) {
  try {
    // Validate Razorpay webhook secret
    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
      throw new Error("RAZORPAY_WEBHOOK_SECRET is not set");
    }

    // Get raw text body
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    console.log("expectedSignature", expectedSignature);
    console.log("Signature", signature);

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }

    // Parse the body
    let event;
    try {
      event = JSON.parse(body);
    } catch (parseError) {
      console.error("Error parsing webhook body:", parseError);
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Handle payment captured
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      console.log(payment);
      // Update order status and fetch order details
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { paymentStatus: "completed" }, // Use "completed" as per your schema
        { new: true }
      ).populate([
        { path: "items.product", select: "name" }, // Ensure Product model has 'name' field
        { path: "user", select: "email" }, // Use "user" instead of "userId"
      ]);

      // Check if order exists
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Send success email
      try {
        await sendMail({
          to: order.user.email, // Access email from populated user
          subject: "Your Payment Was Successful! 🎉",
          html: successEmailTemplate(order),
        });
      } catch (emailError) {
        console.error("Failed to send success email:", emailError);
        // Optionally log this to a monitoring system, but don't fail the webhook
      }
    }

    // Handle payment failed
    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;
      console.log("failed payment", payment);
      // Update order status and fetch order details
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { paymentStatus: "failed" },
        { new: true }
      ).populate([
        { path: "items.product", select: "name" },
        { path: "user", select: "email" },
      ]);

      // Check if order exists
      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Send failure email
      try {
        await sendMail({
          to: order.user.email,
          subject: "Your Payment Failed! 😢",
          html: failedEmailTemplate(order),
        });
      } catch (emailError) {
        console.error("Failed to send failure email:", emailError);
        // Optionally log this to a monitoring system, but don't fail the webhook
      }
    }

    // Return success for handled events or ignored events
    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
