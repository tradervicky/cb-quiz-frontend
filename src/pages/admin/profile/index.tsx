import { getAdminProfile, updateAdminProfile } from "@/apis/admin";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User, Mail, Shield, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";

interface AdminData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  quizes: any[];
  instructorDetail: {
    bio: {
      quizDescTitle: string[];
    };
  };
}

const AdminProfile = () => {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getAdminProfile();
      setAdmin(response);
      setFormData({
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        bio: response.instructorDetail?.bio?.quizDescTitle?.join(", ") || "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateAdminProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        instructorDetail: {
          bio: {
            quizDescTitle: formData.bio.split(",").map((s) => s.trim()).filter(Boolean),
          },
        },
      });
      toast.success("Profile updated successfully");
      fetchProfile(); // Refresh data
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {admin?.firstName?.charAt(0)}{admin?.lastName?.charAt(0)}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {admin?.firstName} {admin?.lastName}
              </h1>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Mail size={16} /> {admin?.email}
              </p>
              <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Shield size={12} /> {admin?.role?.toUpperCase()}
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${admin?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {admin?.isActive ? "Active" : "Inactive"}
                </span>
                {admin?.lastLogin && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    <Clock size={12} /> Last login: {moment(admin.lastLogin).fromNow()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User className="text-primary" size={20} /> Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={admin?.email || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Quiz Description Titles</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Enter comma-separated quiz description titles..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                rows={4}
              />
              <p className="text-xs text-gray-400 mt-1">Separate multiple titles with commas.</p>
            </div>
            <Button
              type="submit"
              disabled={updating}
              className="w-full md:w-auto px-8"
            >
              {updating ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              {updating ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </div>

        {/* Quizzes Summary */}
        {admin?.quizes && admin.quizes.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Quizzes</h2>
            <p className="text-gray-500">You have created {admin.quizes.length} quiz(zes).</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
