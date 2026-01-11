import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getUserDashboardStats } from "../apiCall";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  Target,
  TrendingUp,
  Clock,
  FileText,
  Loader2,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import moment from "moment";

interface DashboardStats {
  totalQuizzesTaken: number;
  quizzesPassed: number;
  quizzesFailed: number;
  averageScore: number;
}

interface RecentQuiz {
  id: string;
  title: string;
  score: number;
  status: string;
  completedAt: string;
}

interface AvailableQuiz {
  id: string;
  title: string;
  category: string;
  duration: number;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state?.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentQuizzes, setRecentQuizzes] = useState<RecentQuiz[]>([]);
  const [availableQuizzes, setAvailableQuizzes] = useState<AvailableQuiz[]>([]);

  const userName = auth?.user?.firstName || "User";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getUserDashboardStats();
        if (response) {
          setStats(response.stats);
          setRecentQuizzes(response.recentQuizzes || []);
          setAvailableQuizzes(response.availableQuizzes || []);
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
    { title: "Quizzes Taken", value: stats?.totalQuizzesTaken || 0, icon: BookOpen, color: "bg-blue-500" },
    { title: "Passed", value: stats?.quizzesPassed || 0, icon: Trophy, color: "bg-green-500" },
    { title: "Failed", value: stats?.quizzesFailed || 0, icon: Target, color: "bg-red-500" },
    { title: "Avg. Score", value: `${stats?.averageScore || 0}%`, icon: TrendingUp, color: "bg-amber-500" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <LayoutDashboard className="text-primary" /> Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Welcome back, {userName}!</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button onClick={() => navigate("/user/all-tests")} className="flex items-center gap-2">
            <BookOpen size={18} /> Browse Quizzes
          </Button>
          <Button variant="outline" onClick={() => navigate("/user/reports")} className="flex items-center gap-2">
            <FileText size={18} /> My Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`${stat.color} p-4 rounded-lg`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quizzes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Clock className="text-primary" size={20}/> Recent Activity
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/user/reports")} className="text-primary text-xs">
              View All <ChevronRight size={14}/>
            </Button>
          </div>
          {recentQuizzes.length > 0 ? (
            <ul className="space-y-3">
              {recentQuizzes.map((quiz) => (
                <li key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800">{quiz.title}</p>
                    <p className="text-xs text-gray-400">{moment(quiz.completedAt).fromNow()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${quiz.score >= 70 ? 'text-green-600' : quiz.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {quiz.score}%
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${quiz.status === 'PASSED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {quiz.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent activity. Start a quiz!</p>
          )}
        </div>

        {/* Available Quizzes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="text-primary" size={20}/> Available Quizzes
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/user/all-tests")} className="text-primary text-xs">
              Browse All <ChevronRight size={14}/>
            </Button>
          </div>
          {availableQuizzes.length > 0 ? (
            <ul className="space-y-3">
              {availableQuizzes.slice(0, 5).map((quiz) => (
                <li key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => navigate(`/user/test-info/${quiz.id}`)}>
                  <div>
                    <p className="font-semibold text-gray-800">{quiz.title}</p>
                    <p className="text-xs text-gray-500">{quiz.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{quiz.duration} min</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">No quizzes available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
