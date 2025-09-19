import React from "react";
import logo from "../../assets/logo.png";
interface ReportStats {
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  // timeTaken: string;
  score: number; // %
  status: string;
}

interface ReportProps {
  orgName: string;
  candidateName: string;
  candidateEmail: string;
  testName: string;
  startedAt: string;
  completedAt: string;
  stats: ReportStats;
}

const ReportCard: React.FC<ReportProps> = ({
  orgName,
  candidateName,
  candidateEmail,
  testName,
  startedAt,
  completedAt,
  stats,
}) => {
  const remarks =
    stats.score >= 80
      ? "🌟 Excellent Performance!"
      : stats.score >= 50
      ? "👍 Good Work!"
      : "⚠ Needs Improvement";

  return (
    <div className="w-[794px] h-[800px] mx-auto bg-white shadow-xl border text-gray-800 p-[32px] relative">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white p-[16px] rounded-lg mb-[24px]">
        <img src={logo} alt="Logo" className="h-[64px] rounded-full" />
        <h1 className="text-[28px] font-bold">{orgName} - Test Report</h1>
      </div>

      {/* Candidate Info */}
      <div className="grid grid-cols-2 gap-[16px] mb-[24px]">
        <div className="bg-blue-50 p-[16px] rounded-lg border border-blue-200">
          <h2 className="text-[16px] font-bold text-blue-700">Candidate</h2>
          <p className="text-[14px]">{candidateName}</p>
          <p className="text-[14px]">{candidateEmail}</p>
        </div>
        <div className="bg-green-50 p-[16px] rounded-lg border border-green-200">
          <h2 className="text-[16px] font-bold text-green-700">Test Details</h2>
          <p className="text-[14px]">Name: {testName}</p>
          <p className="text-[14px]">Started: {startedAt}</p>
          <p className="text-[14px]">Completed: {completedAt}</p>
        </div>
      </div>

      {/* Score */}
      <div className="text-center mb-[32px]">
        <p
          className={`text-[48px] font-bold ${
            stats.score >= 50 ? "text-green-600" : "text-red-600"
          }`}
        >
          {stats.score}%
        </p>
        <p className="text-[18px] font-semibold">{stats.status}</p>
      </div>

      {/* Stats Table */}
      <table className="w-full border-collapse text-[14px] mb-[32px]">
        <thead>
          <tr className="bg-blue-100 text-blue-800">
            <th className="p-[8px] border border-blue-200">Total Questions</th>
            <th className="p-[8px] border border-blue-200">Attempted</th>
            <th className="p-[8px] border border-blue-200">Correct</th>
            <th className="p-[8px] border border-blue-200">Wrong</th>
            {/* <th className="p-[8px] border border-blue-200">Time Taken</th> */}
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="p-[8px] border">{stats.totalQuestions}</td>
            <td className="p-[8px] border">{stats.attempted}</td>
            <td className="p-[8px] border text-green-600">{stats.correct}</td>
            <td className="p-[8px] border text-red-600">{stats.wrong}</td>
            {/* <td className="p-[8px] border">{stats.timeTaken}</td> */}
          </tr>
        </tbody>
      </table>

      {/* Remarks */}
      <div className="bg-yellow-50 border border-yellow-300 p-[16px] rounded-lg mb-[32px]">
        <h2 className="text-[16px] font-bold text-yellow-700 mb-[8px]">
          Remarks
        </h2>
        <p className="text-[14px]">{remarks}</p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-[32px] left-0 right-0 text-center text-[12px] text-gray-500">
        Powered by cbQuiz
      </div>
    </div>
  );
};

export default ReportCard;
