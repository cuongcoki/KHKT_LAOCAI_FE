import { useEffect, useState } from "react";
import { useTeacherStore } from "@/utility/stores/teacherStores";
import { useAuthStore } from "@/utility/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Loader2,
  Phone,
  MoreHorizontal,
  Shield,
  // Edit,
  BookOpen,
  School,
  Award,
  GraduationCap,
  MapPin,
  SquareChartGantt,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const TeacherProfile = () => {
  const { user } = useAuthStore();
  const { teacher, isLoading, error, getProfileTeacher } = useTeacherStore();
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    if (user?.id) {
      getProfileTeacher();
    }
  }, [user?.id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Không thể tải thông tin giáo viên");
    }
  }, [error]);

  // Calculate profile completion
  useEffect(() => {
    if (teacher) {
      let completed = 0;
      const fields = [
        teacher.user_id?.full_name,
        teacher.user_id?.email,
        teacher.user_id?.phone,
        teacher.teacher_code,
        teacher.bio,
        teacher.avatar,
        teacher.school_name,
        teacher.specialization?.length > 0,
        teacher.grade_levels_taught?.length > 0,
      ];

      completed = fields.filter((field) => field).length;
      const percentage = Math.round((completed / fields.length) * 100);
      setProfileCompletion(percentage);
    }
  }, [teacher]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getJoinedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      month: "long",
      year: "numeric",
    });
  };

  const navigate = useNavigate();

  const handleGo = () => {
    navigate("/teacher/dashboard/classes");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary-light)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient Background */}
      <div className="relative">
        {/* Gradient Banner */}
        <div className="h-48 bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-300 to-pink-400 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-green-300 to-blue-300 rounded-full opacity-60 blur-2xl"></div>

          {/* Edit button */}
          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Profile Info - Overlapping */}
        <div className="absolute left-0 right-0   max-w-7xl mx-auto px-6 -mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-secondary)] flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                  {teacher?.avatar || teacher?.user_id?.avatar ? (
                    <img
                      src={teacher?.avatar || teacher?.user_id?.avatar}
                      alt={teacher?.user_id?.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    teacher?.user_id?.full_name?.charAt(0).toUpperCase() || "T"
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {teacher?.user_id?.full_name || "Giáo viên"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {teacher?.teacher_code || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {teacher?.school_name || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Tham gia {getJoinedDate(teacher?.created_at || "")}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-primary-light)]">
                      {teacher?.specialization?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500">Chuyên môn</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--color-secondary)]">
                      {teacher?.grade_levels_taught?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500">Khối dạy</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* <Button className="bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white gap-2">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </Button> */}

                <Button
                  onClick={handleGo}
                  className="bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white gap-2"
                >
                  <SquareChartGantt className="w-4 h-4" />
                  Đi đến trang quản lý lớp học
                </Button>

              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="profile" className="mt-6">
              <TabsList className="border-b w-full justify-start bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-primary-light)] rounded-none px-4 py-2"
                >
                  Thông tin cá nhân
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Profile Completion Card */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Hoàn thiện hồ sơ
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Tiến độ</span>
                            <span className="font-semibold text-[var(--color-primary-light)]">
                              {profileCompletion}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary)] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${profileCompletion}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Bio Card */}
                    {teacher?.bio && (
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Giới thiệu
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {teacher.bio}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Account Info Card */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Tài khoản
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <User className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Tên đăng nhập
                              </p>
                              <p className="text-gray-700 font-medium">
                                {teacher?.user_id?.username || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Award className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Mã giáo viên
                              </p>
                              <p className="text-gray-700 font-medium">
                                {teacher?.teacher_code || "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Columns - Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Thông tin cá nhân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Họ và tên
                              </p>
                              <p className="text-gray-900 font-medium">
                                {teacher?.user_id?.full_name || "Chưa cập nhật"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Email
                              </p>
                              <p className="text-gray-900 break-all">
                                {teacher?.user_id?.email || "Chưa cập nhật"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Số điện thoại
                              </p>
                              <p className="text-gray-900">
                                {teacher?.user_id?.phone || "Chưa cập nhật"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <School className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Trường
                              </p>
                              <p className="text-gray-900">
                                {teacher?.school_name || "Chưa cập nhật"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Teaching Information */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Thông tin giảng dạy
                        </h3>
                        <div className="space-y-4">
                          {/* Specialization */}
                          <div>
                            <p className="text-xs text-gray-500 mb-2">
                              Chuyên môn
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {teacher?.specialization?.map(
                                (subject, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-secondary)] text-white"
                                  >
                                    {subject}
                                  </Badge>
                                )
                              ) || (
                                <span className="text-sm text-gray-500">
                                  Chưa cập nhật
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Grade Levels */}
                          <div>
                            <p className="text-xs text-gray-500 mb-2">
                              Khối lớp giảng dạy
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {teacher?.grade_levels_taught?.map(
                                (grade, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="border-[var(--color-accent)] text-[var(--color-accent)]"
                                  >
                                    <GraduationCap className="w-3 h-3 mr-1" />
                                    Khối {grade}
                                  </Badge>
                                )
                              ) || (
                                <span className="text-sm text-gray-500">
                                  Chưa cập nhật
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Account Status */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Thông tin hệ thống
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Ngày tạo tài khoản
                              </p>
                              <p className="text-gray-900">
                                {formatDate(teacher?.created_at || "")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Cập nhật lần cuối
                              </p>
                              <p className="text-gray-900">
                                {formatDate(teacher?.updated_at || "")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
