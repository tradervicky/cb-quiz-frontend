import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getResult } from "../apiCall";
import { Button } from "@/components/ui/button";
import { Loader2, Printer, CheckCircle, XCircle, Clock, Calendar, User, FileText } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";

const QuizReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchResult = async () => {
      const attemptId = location.state?.attemptId;
      if (!attemptId) {
        toast.error("No attempt ID found. Redirecting to reports.");
        navigate("/user/reports");
        return;
      }

      try {
        const response = await getResult({ attemptId });
        if (response?.data) {
          setData(response.data);
        } else {
            toast.error("Invalid data received");
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch report");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [location.state, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Not Found</h2>
        <Button onClick={() => navigate("/user/reports")}>Back to Reports</Button>
      </div>
    );
  }

  const { user, quiz, timing, summary, questions } = data;

  // Helpers for styling
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'F': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
      return status === 'PASSED' ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-600 bg-red-50 border-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 print:p-0 print:bg-white">
      {/* Print Controls - Hidden in Print */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => navigate("/user/reports")}>
          Back to Reports
        </Button>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer size={16} /> Print Report
        </Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 print:shadow-none print:border-0 print:rounded-none">
        
        {/* Header */}
        <div className="bg-primary p-6 text-white print:bg-white print:text-black print:border-b-2 print:border-gray-800">
            <div className="flex justify-between items-start">
                <div>
                     <h1 className="text-3xl font-bold mb-2">{quiz?.title || "Quiz Report"}</h1>
                     <p className="opacity-90 flex items-center gap-2"><User size={16}/> Instructor: {quiz?.instructor || "CB Quiz"}</p>
                </div>
                <div className="text-right">
                    <div className="text-sm opacity-90">Report Date</div>
                    <div className="font-semibold text-lg">{moment().format("MMM D, YYYY")}</div>
                </div>
            </div>
        </div>

        {/* User & Quiz Info Bar */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 flex flex-wrap gap-6 justify-between text-sm print:bg-gray-100">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                    <p className="text-gray-500">Student Name</p>
                    <p className="font-semibold text-gray-900">{user?.name || "N/A"}</p>
                </div>
            </div>
             <div className="flex gap-8">
                <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={18} />
                    <div>
                        <p className="text-gray-500 text-xs">Attempted On</p>
                        <p className="font-medium text-gray-900">{timing?.startedAt ? moment(timing.startedAt).format("MMM D, YYYY HH:mm") : "N/A"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="text-gray-400" size={18} />
                    <div>
                        <p className="text-gray-500 text-xs">Duration</p>
                        <p className="font-medium text-gray-900">{timing?.duration || "0m"}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8">
            {/* Summary Card */}
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FileText className="text-primary"/> Performance Summary
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Score Card */}
                    <div className="col-span-1 md:col-span-2 bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-around shadow-sm print:border-gray-300">
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" 
                                        strokeDasharray={351.86} 
                                        strokeDashoffset={351.86 - (351.86 * (summary?.percentage || 0)) / 100} 
                                    />
                                </svg>
                                <span className="absolute text-3xl font-bold text-gray-800">{summary?.percentage}%</span>
                            </div>
                            <p className="text-gray-500 mt-2 font-medium">Final Score</p>
                        </div>
                        
                        <div className="h-16 w-px bg-gray-200 mx-4"></div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left">
                            <div>
                                <p className="text-gray-500 text-sm">Status</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(summary?.status)}`}>
                                    {summary?.status || "COMPLETED"}
                                </span>
                            </div>
                             <div>
                                <p className="text-gray-500 text-sm">Grade</p>
                                <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold border ${getGradeColor(summary?.grade)}`}>
                                    {summary?.grade || "-"}
                                </span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Points</p>
                                <p className="font-bold text-xl text-gray-800">{summary?.score} <span className="text-sm font-normal text-gray-400">/ {summary?.totalMarks}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                     <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center gap-4 print:border-gray-200">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                             <span className="text-gray-600">Total Questions</span>
                             <span className="font-bold text-gray-900">{summary?.totalQuestions || 0}</span>
                        </div>
                         <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                             <span className="text-blue-600">Attempted</span>
                             <span className="font-bold text-blue-900">{summary?.attempted || 0}</span>
                        </div>
                         <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                             <span className="text-green-600">Correct</span>
                             <span className="font-bold text-green-900">{summary?.correct || 0}</span>
                        </div>
                         <div className="flex justify-between items-center">
                             <span className="text-red-600">Wrong</span>
                             <span className="font-bold text-red-900">{summary?.wrong || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions Table */}
            <div>
                 <h2 className="text-xl font-bold text-gray-800 mb-6">Question Breakdown</h2>
                 <div className="overflow-hidden rounded-lg border border-gray-200 print:text-sm">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-16">No.</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Question</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Your Answer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Correct Answer</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-20">Result</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {questions?.map((q: any, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">#{index + 1}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        <div dangerouslySetInnerHTML={{ __html: q.questionText }} className="max-w-md prose prose-sm"/>
                                    </td>
                                    <td className={`px-6 py-4 text-sm font-medium ${q.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                        <div className="flex items-center gap-2">
                                            {q.userAnswer || "-"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        {q.correctAnswer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        {q.isCorrect ? (
                                            <CheckCircle className="inline text-green-500" size={20} />
                                        ) : (
                                            <XCircle className="inline text-red-500" size={20} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                 </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-gray-400 text-sm print:fixed print:bottom-4 print:left-0 print:w-full">
                <p>Generated by CB Quiz Platform on {moment().format("LLL")}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuizReport;
