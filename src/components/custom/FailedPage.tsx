import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FailedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
  return (
    <div className="flex items-center justify-center mt-10  px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* Error Icon */}
        <XCircle className="text-red-500 w-20 h-20 mx-auto mb-6" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">Payment Failed ❌</h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-3">
          Oops! Something went wrong while processing your payment. Please try
          again or use a different payment method.
        </p>

        {/* Order Details Box */}
        <div className="bg-gray-100 rounded-xl p-5 mt-6 text-left text-sm space-y-2">
          <p>
            <strong>Order ID:</strong> {order_id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-red-600 font-semibold">Failed</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/user/all-tests")}
            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-xl font-medium text-lg hover:bg-gray-400 transition"
          >
            Go Back to All Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedPage;
