import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboardStats } from "@/apis/admin";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  HelpCircle, 
  TrendingUp,
  PlusCircle,
  Clock,
  Loader2,
  IndianRupee,
  ShoppingCart,
  CheckCircle,
  Target
} from "lucide-react";
import { toast } from "sonner";
import moment from "moment";

interface DashboardStats {
  totalQuizzes: number;
  activeQuizzes: number;
  totalQuestions: number;
  totalStudents: number;
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number;
  totalRevenue: number;
  totalSales: number;
  currency: string;
}

interface QuizPerformance {
  quizId: string;
  title: string;
  price: number;
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number;
  isActive: boolean;
  totalSales: number;
  revenue: number;
}

interface RecentAttempt {
  student: { name: string; email: string };
  quiz: { title: string };
  status: string;
  score: number;
  percentage: number;
  completedAt: string;
}

interface RecentPurchase {
  quizTitle: string;
  amount: number;
  currency: string;
  createdAt: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [quizPerformance, setQuizPerformance] = useState<QuizPerformance[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<RecentAttempt[]>([]);
  const [recentPurchases, setRecentPurchases] = useState<RecentPurchase[]>([]);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getAdminDashboardStats();
        if (response) {
          setStats(response.stats);
          // Sort quiz performance by revenue descending
          const sortedPerformance = (response.quizPerformance || []).sort(
            (a: QuizPerformance, b: QuizPerformance) => b.revenue - a.revenue
          );
          setQuizPerformance(sortedPerformance);
          setRecentAttempts(response.recentAttempts || []);
          setRecentPurchases(response.recentPurchases || []);
          if (response.admin?.firstName) {
            setAdminName(`${response.admin.firstName} ${response.admin.lastName || ''}`);
          }
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    { 
      title: "Total Quizzes", 
      value: `${stats?.activeQuizzes || 0}/${stats?.totalQuizzes || 0}`, 
      subtitle: "Active / Total",
      icon: FileText, 
      color: "bg-blue-500" 
    },
    { 
      title: "Total Students", 
      value: stats?.totalStudents || 0, 
      icon: Users, 
      color: "bg-purple-500" 
    },
    { 
      title: "Completed Attempts", 
      value: stats?.completedAttempts || 0, 
      subtitle: `of ${stats?.totalAttempts || 0} total`,
      icon: CheckCircle, 
      color: "bg-teal-500" 
    },
    { 
      title: "Average Score", 
      value: `${stats?.averageScore || 0}%`, 
      icon: Target, 
      color: "bg-amber-500",
      isScore: true
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LayoutDashboard className="text-primary" /> Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, {adminName}!</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button onClick={() => navigate("/create-quiz")} className="flex items-center gap-2">
            <PlusCircle size={18} /> Create Quiz
          </Button>
          <Button variant="outline" onClick={() => navigate("/quiz/questions")} className="flex items-center gap-2">
            <HelpCircle size={18} /> Add Questions
          </Button>
        </div>
      </div>

      {/* Revenue Card - Featured */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Total Revenue</p>
              <div className="flex items-center gap-2">
                <IndianRupee size={40} className="opacity-80" />
                <span className="text-5xl font-bold">{(stats?.totalRevenue || 0).toLocaleString('en-IN')}</span>
              </div>
              <p className="text-green-100 mt-2 flex items-center gap-2">
                <ShoppingCart size={16} /> {stats?.totalSales || 0} total sales
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-green-100 text-sm">Currency</div>
              <div className="text-2xl font-semibold">{stats?.currency || 'INR'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-1">
            <div className={`${stat.color} p-4 rounded-xl`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.subtitle && <p className="text-xs text-gray-400">{stat.subtitle}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-primary" size={20}/> Quiz Performance
        </h2>
        {quizPerformance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Quiz Title</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Price</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Attempts</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Avg. Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Sales</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Revenue</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {quizPerformance.map((quiz) => (
                  <tr key={quiz.quizId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-800">{quiz.title}</td>
                    <td className="py-4 px-4 text-right text-gray-600">{formatCurrency(quiz.price)}</td>
                    <td className="py-4 px-4 text-center text-gray-600">
                      {quiz.completedAttempts}/{quiz.totalAttempts}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${quiz.averageScore >= 70 ? 'bg-green-100 text-green-700' : quiz.averageScore >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {quiz.averageScore}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-gray-800">{quiz.totalSales}</td>
                    <td className="py-4 px-4 text-right font-bold text-green-600">{formatCurrency(quiz.revenue)}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${quiz.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {quiz.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No quiz performance data available.</p>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attempts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-primary" size={20}/> Recent Attempts
          </h2>
          {recentAttempts.length > 0 ? (
            <ul className="space-y-3">
              {recentAttempts.slice(0, 6).map((attempt, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800">{attempt.student?.name}</p>
                    <p className="text-xs text-gray-500">{attempt.quiz?.title}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${attempt.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {attempt.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                    </span>
                    {attempt.status === 'COMPLETED' && (
                      <p className={`font-bold mt-1 ${attempt.percentage >= 70 ? 'text-green-600' : attempt.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {attempt.percentage}%
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent attempts.</p>
          )}
        </div>

        {/* Recent Purchases */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingCart className="text-primary" size={20}/> Recent Purchases
          </h2>
          {recentPurchases.length > 0 ? (
            <ul className="space-y-3">
              {recentPurchases.slice(0, 6).map((purchase, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800">{purchase.quizTitle}</p>
                    <p className="text-xs text-gray-400">{moment(purchase.createdAt).format("MMM D, YYYY")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(purchase.amount)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent purchases.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;