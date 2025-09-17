import { useEffect, useState } from "react";
import { getMyQuiz } from "../../apiCall";
import InstructorTest from "../../instructorTest";
import QuizLoader from "@/components/custom/quizLoader";
import CustomPagination from "@/components/custom/CustomPagination";

const MyTests = () => {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const fetchMyTests = async (page = 1) => {
    try {
      let _payload = {
        page: page,
        limit: 10,
        filter: "",
        search: "",
      };
      setLoading(true);
      const response = await getMyQuiz(_payload);
      setInstructorData(response?.data);
      setPagination({
        total: response?.total,
        page: response?.page,
        totalPages: response?.totalPages,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyTests(pagination.page);
  }, [pagination.page]);
  return (
    <div>
      <div className=" mt-4 max-h-[78vh] overflow-y-scroll">
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

export default MyTests;
