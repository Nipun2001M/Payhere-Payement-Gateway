import React, { useEffect, useState } from "react";
import axios from "axios";

const Payment = ({
  firstname,
  lastname,
  email,
  paymentTitle,
  amount,
  sendUserId,
  reciveUserID,
  setPaymentSuccess,
  setOrderID,
}) => {
  const [Pay, setPay] = useState({});
  const [success, setSuccess] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false); // New state to track script load

  const formattedAmount = parseFloat(amount);

  // Load the Payhere script only once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.onload = () => {
      console.log("Payhere script loaded successfully.");
      setScriptLoaded(true); // Update state once script is loaded
    };
    script.onerror = () => {
      console.error("Payhere script failed to load.");
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Request hash calculation from backend
  useEffect(() => {
    axios
      .put("http://localhost:8080/auth/calculateHash", null, {
        params: { amount: formattedAmount },
      })
      .then((res) => {
        setPay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [amount]);

  // Payhere Payment details
  const payment = {
    sandbox: true,
    merchant_id: "1228616",
    return_url: "https://www.example.com/success",
    cancel_url: "https://www.example.com/cancel",
    notify_url: "https://a4dc-175-157-250-218.ngrok-free.app/auth/notify",
    order_id: Pay.orderId,
    items: paymentTitle,
    amount: "10011.00",
    currency: "LKR",
    hash: Pay.hash,
    first_name: firstname,
    last_name: lastname,
    email: email,
    phone: "0765424122",
    address: "No.1, Galle Road",
    city: "Colombo",
    country: "Sri Lanka",
  };

  // Handle Payhere payment
  function pay() {
    console.log("Payhere payment");
    console.log(payment)
    if (scriptLoaded && window.payhere) {
      window.payhere.startPayment(payment);
    } else {
      console.error("Payhere script is not loaded yet.");
    }
  }

  // Payhere callback handlers
  useEffect(() => {
    if (scriptLoaded && window.payhere) {
      window.payhere.onCompleted = function (order_id) {
        console.log("Payment completed. OrderID:" + order_id);
        setPaymentSuccess(true);
        setSuccess(true);
        setOrderID(order_id);
      };

      window.payhere.onDismissed = function () {
        console.log("Payment dismissed");
      };

      window.payhere.onError = function (error) {
        console.log("Error: " + error);
      };
    }
  }, [Pay, scriptLoaded]);

  return (
    <button onClick={pay} className="btn-ServiceProvider-1 px-1">
      Pay with Payhere
    </button>
  );
};

export default Payment;
