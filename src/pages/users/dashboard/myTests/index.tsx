import { useEffect, useState } from "react";
import { getMyQuiz } from "../../apiCall";
import InstructorTest from "../../instructorTest";
import QuizLoader from "@/components/custom/quizLoader";

const MyTests = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMyTests = async () => {
    try {
      let _payload = {
        page: 1,
        limit: 10,
        filter: "",
        search: "",
      };
      setLoading(true);
      const response = await getMyQuiz(_payload);
      setInstructorData(response?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyTests();
  }, []);
  return (
    <div>
      <div className=" mt-4 max-h-[80vh] overflow-y-scroll">
        {loading && <QuizLoader />}
        {instructorData?.map((d) => (
          <InstructorTest
            data={d}
            isAuthenticated={false}
            key={d._id}
            purchased={true}
            // handleBuy={handleCreatePayment}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTests;
