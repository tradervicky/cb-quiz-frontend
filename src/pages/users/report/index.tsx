import React, { useEffect, useState } from "react";
import { getUserTestReport } from "../apiCall";
import LoaderTable from "@/components/custom/LoaderTable";
import CustomTable from "@/components/custom/CustomTable";
const headerData = [
  { title: "SL No.", key: "sNo" as const },
  { title: "Quiz Name", key: "title" as const },
  // { title: "Quiz Id", key: "quizId" as const },
  { title: "Start Date", key: "startedAt" as const },
  { title: "Expiry Date", key: "expiresAt" as const },
  { title: "Status", key: "status" as const },
  { title: "Score", key: "score" as const },
  { title: "Actions", key: "actions" as const },
];

const UserReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getAllTestReports = async () => {
    try {
      const response = await getUserTestReport();
      let _data = response?.data?.map((d, index) => ({
        ...d,
        sNo: index + 1,
        actions: (
          <div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
              View / Resume Test
            </button>
          </div>
        ),
      }));
      setData(_data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTestReports();
  }, []);
  return (
    <div>
      {loading ? (
        <LoaderTable />
      ) : (
        <CustomTable headerData={headerData} rowsData={data} />
      )}
    </div>
  );
};

export default UserReports;
