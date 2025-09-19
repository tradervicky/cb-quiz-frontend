import ReportCard from "@/components/custom/Report";
export default function InvoicePage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ReportCard
        orgName="cbQuiz"
        candidateName="Vicky Kumar Gupta"
        candidateEmail="vicky-user@gmail.com"
        testName="Electrical Basic Test"
        startedAt="17 Sept 2025, 11:03 pm"
        completedAt="17 Sept 2025, 11:05 pm"
        stats={{
          totalQuestions: 10,
          attempted: 9,
          correct: 3,
          wrong: 6,
          //   timeTaken: "1 min",
          score: 30,
          status: "Not Passed",
        }}
      />
    </div>
  );
}
