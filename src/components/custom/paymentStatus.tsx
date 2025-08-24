import { verifyPayment } from "@/pages/users/apiCall";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderStatus = searchParams.get("order_status");
  const orderId = searchParams.get("order_id");
  console.log(orderStatus, orderId);
  useEffect(() => {
    if (orderStatus === "SUCCESS") {
      navigate(`/user/payment-success?order_id=${orderId}`);
    } else {
      navigate(`/user/payment-failed?order_id=${orderId}`);
    }
  }, [orderStatus, orderId, navigate]);

  useEffect(() => {
    if (orderId) {
      // Always confirm payment status via backend!
      // axios.post("/api/verifyPayment", { orderId }).then((res) => {
      //   const actualStatus = res.data.status;
      //   // Now safely redirect based on verified backend status
      //   if (actualStatus === "SUCCESS") {
      //     // redirect to payment success page
      //   } else {
      //     // redirect to payment failed page
      //   }
      // });
      handleVeryPayment();
    }
  }, [orderId]);
  const handleVeryPayment = async () => {
    const response = await verifyPayment({ orderId });
    console.log(response);
    if (response.status === "SUCCESS") {
      navigate(
        `/user/payment-success?order_id=${orderId}&data=${JSON.stringify(
          response
        )}`
      );
    } else if (
      response.status === "FAILED" ||
      response.status === "CANCELLED"
    ) {
      navigate(`/user/payment-failed?order_id=${orderId}`);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-semibold">Processing Payment...</h1>
    </div>
  );
};

export default PaymentStatus;
