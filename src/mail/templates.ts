import { formatDate } from "@/helpers/formatDate";

export const successEmailTemplate = (order: any) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f9fc;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #4CAF50;
        color: white;
        padding: 20px 0;
        border-radius: 8px 8px 0 0;
      }
      .content {
        margin: 20px 0;
        line-height: 1.6;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        color: #555555;
        font-size: 12px;
      }
      .btn {
        display: inline-block;
        margin: 20px auto;
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Payment Successful!</h1>
      </div>
      <div class="content">
        <p>Hi ${order.user},</p>
        <p>Thank you for your purchase from <b>NextGenElectronics</b>. We are excited to deliver your Order!</p>
        <p><b>Order Name: </b>${order.items}</p>
        <p><b>Order Date: </b>${formatDate(order.createdAt)}</p>
        <p><b>Order ID: </b>#${order?._id?.toString().slice(-6)}</p>
        <p><b>Transaction Amount: </b>${order.totalAmount}</p>
        <a class="btn" href=${process.env.FRONT_URL!}>go to account</a>
      </div>
      <div class="footer">
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Thank you for choosing LightRoom!</p>
      </div>
    </div>
  </body>
</html>
`;

export const failedEmailTemplate = (order: any) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f9fc;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #FF6347;
        color: white;
        padding: 20px 0;
        border-radius: 8px 8px 0 0;
      }
      .content {
        margin: 20px 0;
        line-height: 1.6;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        color: #555555;
        font-size: 12px;
      }
      .btn {
        display: inline-block;
        margin: 20px auto;
        background-color: #FF6347;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Payment Failed</h1>
      </div>
      <div class="content">
       <p>Hi ${order.user},</p>
        <p>We regret to inform you that your recent payment attempt on <b>LightRoom</b> was unsuccessful.</p>
        <p><b>Order Name: </b>${order.items}</p>
          <p><b>Order Date: </b>${formatDate(order.createdAt)}</p>
        <p><b>Order ID: </b>#${order?._id?.toString().slice(-6)}</p>
        <p><b>Transaction Amount: </b>${order.totalAmount}</p>
        <p>Please check your payment details and try again. If the issue persists, feel free to contact our support team for assistance.</p>
        <a class="btn" href=${process.env.FRONT_URL!}>Retry Payment</a>
      </div>
      <div class="footer">
        <p>Thank you for choosing LightRoom!</p>
        <p>If you need help, contact us at <a href="mailto:support@lighteroom.com">support@lighteroom.com</a>.</p>
      </div>
    </div>
  </body>
</html>
`;
