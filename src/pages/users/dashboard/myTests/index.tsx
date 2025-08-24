import { useEffect, useState } from "react";
import { getMyQuiz } from "../../apiCall";
import InstructorTest from "../../instructorTest";

const MyTests = () => {
  const [instructorData, setInstructorData] = useState([]);
  const fetchMyTests = async () => {
    try {
      let _payload = {
        page: 1,
        limit: 10,
        filter: "",
        search: "",
      };
      const response = await getMyQuiz(_payload);
      setInstructorData(response?.data);
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    fetchMyTests();
  }, []);
  return (
    <div>
      <div className=" mt-4 max-h-[80vh] overflow-y-scroll">
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
