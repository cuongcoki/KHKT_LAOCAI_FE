import { useEffect, useState } from "react";
import { useTeacherStore } from "@/utility/stores/teacherStores";
import { useAuthStore } from "@/utility/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Calendar,
  Loader2,
  Phone,
  Shield,
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Card */}
        <Card className="mb-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-secondary)] flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
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
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {teacher?.user_id?.full_name || "Giáo viên"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-gray-600 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Mã GV: {teacher?.teacher_code || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{teacher?.school_name || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Tham gia {getJoinedDate(teacher?.created_at || "")}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[var(--color-primary-light)]">
                      {teacher?.specialization?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500">Chuyên môn</p>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[var(--color-primary-light)]">
                      {teacher?.grade_levels_taught?.length || 0}
                    </p>
                    <p className="text-xs text-gray-500">Khối dạy</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <Button
                  onClick={handleGo}
                  className="bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white gap-2"
                >
                  <SquareChartGantt className="w-4 h-4" />
                  Quản lý lớp học
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Left Column */}
          <div className="space-y-2">
            {/* Profile Completion */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm">
                  Hoàn thiện hồ sơ
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
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
                <CardContent className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
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
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
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

            {/* Contact Info */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  Liên hệ
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-gray-700 break-all">
                        {teacher?.user_id?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Điện thoại</p>
                      <p className="text-gray-700">
                        {teacher?.user_id?.phone || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-2 bg-white rounded-2xl border-2 border-gray-200 shadow-sm">
            {/* Personal Information */}
            <Card className="border-none shadow-none">
              <CardContent className="px-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Họ và tên</p>
                      <p className="text-gray-700 font-medium">
                        {teacher?.user_id?.full_name || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <School className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Trường</p>
                      <p className="text-gray-700 font-medium">
                        {teacher?.school_name || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Information */}
            <Card className="border-none shadow-none">
              <CardContent className="px-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4" />
                  Thông tin giảng dạy
                </h3>
                <div className="space-y-4">
                  {/* Specialization */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Chuyên môn</p>
                    <div className="flex flex-wrap gap-2">
                      {teacher?.specialization && teacher.specialization.length > 0 ? (
                        teacher.specialization.map((subject, index) => (
                          <Badge
                            key={index}
                            className="bg-gradient-to-r from-[var(--color-primary-light)] to-primary-dark text-white"
                          >
                            {subject}
                          </Badge>
                        ))
                      ) : (
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
                      {teacher?.grade_levels_taught && teacher.grade_levels_taught.length > 0 ? (
                        teacher.grade_levels_taught.map((grade, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-primary-dark text-[var(--color-primary-light)]"
                          >
                            <GraduationCap className="w-3 h-3 mr-1" />
                            Khối {grade}
                          </Badge>
                        ))
                      ) : (
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
            <Card className="border-none shadow-none">
              <CardContent className="px-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  Hoạt động
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Tham gia</p>
                      <p className="text-gray-700 font-medium">
                        {teacher?.created_at
                          ? formatDate(teacher.created_at)
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        Cập nhật gần nhất
                      </p>
                      <p className="text-gray-700 font-medium">
                        {teacher?.updated_at
                          ? formatDate(teacher.updated_at)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
