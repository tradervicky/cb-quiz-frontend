import { useEffect, useState } from "react";
import InstructorTest from "../../instructorTest";
import { createOrder, getInstructorQuiz } from "../../apiCall";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
const AllTests = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const fetchQuiz = async () => {
    const response = await getInstructorQuiz();
    setInstructorData(response?.data);
  };
  useEffect(() => {
    fetchQuiz();
    loadCashfree();
  }, []);
  const loadCashfree = async () => {
    const cf = await load({
      mode: "sandbox",
    }); // or "production"
    setCashfree(cf);
  };
  console.log(cashfree);
  const handleCreatePayment = async (data: any) => {
    try {
      let payload = {
        amount: data?.price,
        quizId: data?._id,
        redirectUrl: window.location.origin + "/user/payment-status",
      };
      console.log(payload);
      const res = await createOrder(payload);
      if (!res?.payment_session_id || !cashfree) {
        console.error("Cashfree SDK not loaded or token missing");
        return;
      }
      console.log(cashfree);
      // Open Cashfree Checkout
      cashfree.checkout({
        paymentSessionId: res?.payment_session_id, // 👈 Required
        redirectTarget: "_self",
      });
    } catch (error) {
    } finally {
    }
  };
  return (
    <div className="mt-4   overflow-y-scroll h-[80vh]">
      {instructorData?.map((d) => (
        <InstructorTest
          data={d}
          isAuthenticated={true}
          handleBuy={handleCreatePayment}
        />
      ))}
    </div>
  );
};

export default AllTests;
