import React, { useEffect, useState } from "react";
import { getUserTestReport } from "../apiCall";
import LoaderTable from "@/components/custom/LoaderTable";
import CustomTable from "@/components/custom/CustomTable";
import StatusBadge from "@/components/custom/StatusBadge";
import CustomPagination from "@/components/custom/CustomPagination";
import { Download, Eye, Play } from "lucide-react";
import { getFinalStatus } from "@/shared/function";
import { formatShortMonthDate } from "@/shared/date";
import { useNavigate } from "react-router-dom";
import { useDetectDevTools } from "@/hooks/useDetectDevTools";
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
  const navigate = useNavigate();
  const [state, setState] = useState<any>(null);
  const isDevToolsOpen = useDetectDevTools();
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [quizInfo, setQuizInfo] = useState<any>({
    quizId: "",
    quiestionId: "",
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
                  onClick={() => handleAttempt(d.quizId)}
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
  const handleAttempt = (id: string) => {
    // if (allData?.remainingQuestions < 10) {
    //   toast("No Enough Questions. Please try another quiz.");
    //   return;
    // }
    // if (quizInfo.quiestionId && quizInfo.quizId) {
    //   if (isDevToolsOpen) {
    //     alert("Please close your dev tools");
    //     return;
    //   }
    //   navigate(
    //     `/user/final-test/${state?._id}/${sessionStorage.getItem(
    //       "attemptedQuestionId"
    //     )}`
    //   );
    // } else {
    //   if (isDevToolsOpen) {
    //     alert("Please close your dev tools");
    //     return;
    //   }
    navigate(`/user/final-test/${id}/1`);
    //   sessionStorage.setItem("attemptedQuestionId", "1");
    //   sessionStorage.setItem("attemptedQuizId", id);
    // }
  };
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
