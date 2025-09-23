import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Payment = () => {
  const location = useLocation();
  const total = location.state?.total || 0; // fallback if not passed

  // ✅ Ensure Razorpay script is loaded
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your internet.");
      return;
    }

    const options = {
      key: "rzp_test_RFqbQT8CRcqtO7", // 🔑 Replace with your actual Razorpay Key ID
      amount: total * 100, // Razorpay works in paise
      currency: "INR",
      name: "Grocery Mart",
      description: "Order Payment",
      image: "/vite.svg", // optional: add your logo here
      handler: function (response) {
        alert("✅ Payment successful! ID: " + response.razorpay_payment_id);
        // 👉 you can call backend API here to save payment details
      },
      prefill: {
        name: "DINESH KARTHIK",
        email: "dineshkarthikalla@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Online Grocery Mart Corporate Office",
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert("❌ Payment Failed: " + response.error.description);
    });

    rzp1.open();
  };

  return (
    <div className="payment-container" style={{ textAlign: "center", padding: "40px" }}>
      <h2>Razorpay Payment</h2>
      <p>Click below to pay securely with Razorpay:</p>
      <h3>Total: ₹{total}</h3>
      <button
        onClick={handleRazorpay}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          background: "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        💳 Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
