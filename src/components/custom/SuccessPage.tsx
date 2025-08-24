import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));
  console.log(data);
  return (
    <div className="flex items-center justify-center mt-10 bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <CheckCircle2 className="text-green-500 w-20 h-20 mx-auto mb-6" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-3">
          Thank you for your purchase. Your payment has been received
          successfully.
        </p>

        {/* Order Details Box */}
        <div className="bg-gray-100 rounded-xl p-5 mt-6 text-left text-sm space-y-2">
          <p>
            <strong>Order Amount:</strong> {"₹"}
            {data.amount}
          </p>
          <p>
            <strong>Order ID:</strong> {data.orderId}
          </p>
          <p>
            <strong>Reference ID:</strong>
            {data.referenceId}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600 font-semibold">Success</span>
          </p>
          <p>
            <strong>Payment Method:</strong> {data.paymentMethod}
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/user/my-quiz")}
          className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-green-700 transition"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
