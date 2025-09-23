import React, { useEffect, useState } from "react";

const RazorpayCheckout = () => {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setSdkReady(true);
    script.onerror = () => alert("Razorpay SDK failed to load. Check your internet.");
    document.body.appendChild(script);
  }, []);

  const openRazorpay = () => {
    if (!sdkReady || !window.Razorpay) {
      alert("Razorpay SDK not yet loaded. Please wait.");
      return;
    }

    const options = {
      key: "rzp_test_RFqbQT8CRcqtO7", // 🔑 replace with Razorpay Key ID
      amount: 5000, // 5000 paise = ₹50
      currency: "INR",
      name: "Online Grocery Store",
      description: "Test Transaction",
      handler: function (response) {
        alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="razorpay-container">
      <h2>Razorpay Payment</h2>
      <button className="razorpay-btn" onClick={openRazorpay} disabled={!sdkReady}>
        💳 Pay with Razorpay
      </button>
      {!sdkReady && <p>Loading Razorpay...</p>}
    </div>
  );
};

export default RazorpayCheckout;
