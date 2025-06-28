// const SSLCommerzPayment = require("sslcommerz-lts");
// const Order = require("../models/Order");

// const store_id = process.env.SSLCOMMERZ_STORE_ID;
// const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
// const is_live = false; // Make this true for production

// const initiatePayment = async (req, res) => {
//   const { totalPrice } = req.body;

//   const data = {
//     total_amount: totalPrice,
//     currency: "BDT",
//     tran_id: `TXN_${Date.now()}`,
//     success_url: "http://localhost:5000/api/payment/success",
//     fail_url: "http://localhost:5000/api/payment/fail",
//     cancel_url: "http://localhost:5000/api/payment/cancel",
//     cus_name: req.user.name,
//     cus_email: req.user.email,
//     cus_add1: "Dhaka",
//     cus_phone: "01700000000",
//     shipping_method: "NO",
//     product_name: "BakeBazaar Order",
//     product_category: "Food",
//     product_profile: "general",
//   };

//   const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//   sslcz.init(data).then((apiResponse) => {
//     res.json({ paymentUrl: apiResponse.GatewayPageURL });
//   });
// };

// module.exports = { initiatePayment };

// const SSLCommerzPayment = require("sslcommerz-lts");
// const Order = require("../models/Order");

// const is_live = false; // Make this true for production

// const initiatePayment = async (req, res) => {
//   try {
//     const store_id = process.env.SSLCOMMERZ_STORE_ID;
//     const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
//     const { totalPrice } = req.body;

//     const data = {
//       total_amount: totalPrice,
//       currency: "BDT",
//       tran_id: `TXN_${Date.now()}`,
//       success_url: "http://localhost:5000/api/payment/success",
//       fail_url: "http://localhost:5000/api/payment/fail",
//       cancel_url: "http://localhost:5000/api/payment/cancel",
//       cus_name: req.user.name,
//       cus_email: req.user.email,
//       cus_add1: "Dhaka",
//       cus_phone: "01700000000",
//       shipping_method: "NO",
//       product_name: "BakeBazaar Order",
//       product_category: "Food",
//       product_profile: "general",
//     };

//     console.log("🔹 Payment Request Data:", data); // Debugging Log

//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//     sslcz
//       .init(data)
//       .then((apiResponse) => {
//         console.log("🔹 SSLCommerz API Response:", apiResponse); // Debugging Log
//         res.json({ paymentUrl: apiResponse.GatewayPageURL });
//       })
//       .catch((error) => {
//         console.error("🔴 SSLCommerz Error:", error);
//         res
//           .status(500)
//           .json({ message: "Payment Initialization Failed", error });
//       });
//   } catch (error) {
//     console.error("🔴 Server Error in Payment:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// module.exports = { initiatePayment };

const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("../models/Order");

const is_live = false; // Make this true for production

const initiatePayment = async (req, res) => {
  try {
    const store_id = process.env.SSLCOMMERZ_STORE_ID;
    const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
    const { totalPrice, orderId } = req.body;

    const data = {
      total_amount: totalPrice,
      currency: "BDT",
      tran_id: `TXN_${Date.now()}`,
      // success_url: `${BASE_URL}/api/payment/success`,
      // fail_url: `${BASE_URL}/api/payment/fail`,
      // cancel_url: `${BASE_URL}/api/payment/cancel`,
      // success_url: `${process.env.SERVER_BASE_URL}/api/payment/success`,
      // fail_url: `${process.env.SERVER_BASE_URL}/api/payment/fail`,
      // cancel_url: `${process.env.SERVER_BASE_URL}/api/payment/cancel`,

      success_url:
        "https://bakebazaar-backend.onrender.com/api/payment/success",
      fail_url: "https://bakebazaar-backend.onrender.com/api/payment/fail",
      cancel_url: "https://bakebazaar-backend.onrender.com/api/payment/cancel",

      // success_url: "http://localhost:5000/api/payment/success",
      // fail_url: "http://localhost:5000/api/payment/fail",
      // cancel_url: "http://localhost:5000/api/payment/cancel",
      cus_name: req.user.name,
      cus_email: req.user.email,
      cus_add1: "Dhaka",
      cus_phone: "01700000000",
      shipping_method: "NO",
      product_name: "BakeBazaar Order",
      product_category: "Food",
      product_profile: "general",
      value_a: orderId, // ✅ Pass Order ID for reference
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      res.json({ paymentUrl: apiResponse.GatewayPageURL });
    });
  } catch (error) {
    console.error("🔴 Payment Error:", error);
    res.status(500).json({ message: "Payment Initialization Failed", error });
  }
};

// ✅ Handle Payment Success
// const paymentSuccess = async (req, res) => {
//   try {
//     console.log("✔️ Payment Success Body:", req.body);

//     const { tran_id, value_a } = req.body; // value_a = orderId
//     const order = await Order.findById(value_a);

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.paymentStatus = "Paid";
//     order.transactionId = tran_id;
//     await order.save();

//     res.redirect("http://localhost:5173/dashboard"); // Redirect to User Dashboard
//   } catch (error) {
//     console.error("🔴 Payment Success Error:", error);
//     res.status(500).json({ message: "Payment Success Handling Failed", error });
//   }
// };

const paymentSuccess = async (req, res) => {
  console.log("🔔 SSLCommerz Success Callback Hit");
  console.log("req.body:", req.body);
  console.log("req.query:", req.query);

  try {
    const tran_id = req.body?.tran_id || req.query?.tran_id;
    const orderId = req.body?.value_a || req.query?.value_a;

    console.log("✅ orderId:", orderId);
    console.log("✅ tran_id:", tran_id);

    if (!orderId) {
      console.error("❌ Order ID not received");
      return res.status(400).json({ message: "Order ID missing" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "Paid";
    order.transactionId = tran_id;
    await order.save();

    // res.redirect("http://localhost:5173/dashboard");
    // res.redirect(
    //   `${process.env.BASE_URL}/payment-success`
    // );

    const isWeb = req.headers["user-agent"]?.includes("Mozilla");

    if (isWeb) {
      res.redirect("http://localhost:5173/payment-success"); // web version
    } else {
      res.redirect("bakebazar://payment-success");
    }
  } catch (error) {
    console.error("🔴 Payment Success Error:", error);
    res.status(500).json({ message: "Payment Success Handling Failed", error });
  }
};

// ✅ Handle Payment Failure
const paymentFailure = async (req, res) => {
  try {
    const { value_a } = req.body; // value_a = orderId
    const order = await Order.findById(value_a);

    if (order) {
      order.paymentStatus = "Failed";
      await order.save();
    }

    res.redirect("bakebazar://custome/Cart"); // Redirect to Cart Page
  } catch (error) {
    console.error("🔴 Payment Failure Error:", error);
    res.status(500).json({ message: "Payment Failure Handling Failed", error });
  }
};

module.exports = { initiatePayment, paymentSuccess, paymentFailure };
