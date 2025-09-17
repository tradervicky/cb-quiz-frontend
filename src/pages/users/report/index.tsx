import React, { useEffect, useState } from "react";
import { getUserTestReport } from "../apiCall";
import LoaderTable from "@/components/custom/LoaderTable";
import CustomTable from "@/components/custom/CustomTable";
import StatusBadge from "@/components/custom/StatusBadge";
import CustomPagination from "@/components/custom/CustomPagination";
import { Download, Eye, Play } from "lucide-react";
import { getFinalStatus } from "@/shared/function";
import { formatShortMonthDate } from "@/shared/date";
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
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const getAllTestReports = async (page) => {
    try {
      let _payload = { page: page, limit: 10 };
      const response = await getUserTestReport(_payload);
      let _data = response?.data?.map((d, index) => ({
        ...d,
        sNo: index + 1,
        startedAt: formatShortMonthDate(d.startedAt),
        expiresAt: formatShortMonthDate(d.expiresAt),
        status: <StatusBadge expiryDate={d.expiresAt} status={d.status} />,
        actions: (
          <div className="flex items-center gap-2">
            {getFinalStatus(d.expiresAt, d.status) === "Completed" && (
              <Download
                size={18}
                className="cursor-pointer hover:scale-110 ease-in-out"
              />
            )}
            {getFinalStatus(d.expiresAt, d.status) === "Ongoing" && (
              <div className="flex gap-2">
                <Play
                  size={18}
                  className="cursor-pointer hover:scale-110 ease-in-out"
                />
              </div>
            )}
            {getFinalStatus(d.expiresAt, d.status) !== "Ongoing" && (
              <Eye
                size={18}
                className="cursor-pointer hover:scale-110 ease-in-out"
              />
            )}
          </div>
        ),
      }));
      setPagination(response?.pagination);
      setData(_data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTestReports(pagination.page);
  }, [pagination.page]);
  console.log(pagination);
  return (
    <div>
      <div>
        {loading ? (
          <LoaderTable />
        ) : (
          <CustomTable headerData={headerData} rowsData={data} />
        )}
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

export default UserReports;
