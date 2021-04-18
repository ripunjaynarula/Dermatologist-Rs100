import express from "express";
import { uid } from "rand-token";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY,
  key_secret: process.env.RAZORPAY_TEST_SECRET,
});

const router = express.Router();

router.post("/", async (req, res) => {
  const payment_capture = 1;
  const amount = "10000";
  const currency = "INR";
  const options = {
    amount,
    currency,
    receipt: uid(12),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.send({
      success: true,
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (e) {
    return res.send({ success: false, message: "internl error" });
  }
});

export default router;
