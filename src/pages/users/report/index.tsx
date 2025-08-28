import React, { useEffect, useState } from "react";
import { getUserTestReport } from "../apiCall";
import LoaderTable from "@/components/custom/LoaderTable";
import CustomTable from "@/components/custom/CustomTable";
const headerData = [
  { title: "SL No.", key: "serialNo" as const },
  { title: "Quiz Name", key: "title" as const },
  { title: "Question Type", key: "queType" as const },
  { title: "No. of Questions", key: "noOfQue" as const },
  { title: "Actions", key: "actions" as const },
];

const UserReports = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getAllTestReports = async () => {
    try {
      const response = await getUserTestReport();
      setData(response?.data);
      console.log(response?.data);
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
      Reporting Please
      {loading ? (
        <LoaderTable />
      ) : (
        <CustomTable headerData={headerData} rowsData={data} />
      )}
    </div>
  );
};

export default UserReports;
