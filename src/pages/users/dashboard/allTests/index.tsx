import { useEffect, useState } from "react";
import InstructorTest from "../../instructorTest";
import { createOrder, getInstructorQuiz, getPrivateQuiz } from "../../apiCall";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import QuizLoader from "@/components/custom/quizLoader";
import CustomPagination from "@/components/custom/CustomPagination";
const AllTests = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const fetchQuiz = async (page = 1) => {
    let _payload = {
      page: page,
      limit: 10,
      filter: "",
      search: "",
    };
    setLoading(true);
    const response = await getPrivateQuiz(_payload);
    setInstructorData(response?.data);
    setPagination({
      total: response?.total,
      page: response?.page,
      totalPages: response?.totalPages,
    });
    setLoading(false);
  };
  console.log(pagination);
  useEffect(() => {
    loadCashfree();
  }, []);
  useEffect(() => {
    fetchQuiz(pagination.page);
  }, [pagination.page]);
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
    <div className="mt-4   overflow-y-scroll h-[78vh]">
      {loading && <QuizLoader />}
      {instructorData?.map((d) => (
        <InstructorTest
          data={d}
          isAuthenticated={true}
          handleBuy={handleCreatePayment}
        />
      ))}
      <div className="absolute bottom-0 right-0 pb-1 pr-4">
        <CustomPagination
          totalPages={pagination.totalPages}
          currentPage={pagination.page}
          onPageChange={(newPage) =>
            setPagination((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </div>
  );
};

export default AllTests;
