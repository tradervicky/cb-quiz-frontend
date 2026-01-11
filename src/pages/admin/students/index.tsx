import { useEffect, useState } from "react";
import { getAdminStudents } from "@/apis/admin";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  Loader2,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import moment from "moment";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  quizzesTaken: number;
  lastActive: string;
}

interface Pagination {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

const AdminStudents = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    totalPages: 1,
    limit: 10,
  });

  const fetchStudents = async (page: number = 1, searchQuery: string = "") => {
    setLoading(true);
    try {
      const response = await getAdminStudents({ page, limit: 10, search: searchQuery });
      if (response) {
        setStudents(response.students || response.data || []);
        setPagination(response.pagination || {
          total: response.total || 0,
          page: page,
          totalPages: response.totalPages || 1,
          limit: 10,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1, "");
  }, []);

  const handleSearch = () => {
    fetchStudents(1, search);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchStudents(newPage, search);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="text-primary" /> Students
          </h1>
          <p className="text-gray-500 mt-1">Manage all registered students</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={20} />
          <span className="font-medium">Total Students:</span>
          <span className="font-bold text-gray-900">{pagination.total}</span>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : students.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Student</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Email</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Quizzes Taken</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Joined</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.firstName} {student.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={14} />
                          {student.email}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {student.quizzesTaken || 0}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar size={14} />
                          {moment(student.createdAt).format("MMM D, YYYY")}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-500 text-sm">
                          {student.lastActive ? moment(student.lastActive).fromNow() : "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} students
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm text-gray-600 px-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <Users className="mx-auto mb-4 text-gray-300" size={48} />
            <p>No students found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
