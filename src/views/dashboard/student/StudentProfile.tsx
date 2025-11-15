import { useEffect, useState } from "react";
import { useStudentStore } from "@/utility/stores/studentStore";
import { useAuthStore } from "@/utility/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  School,
  Calendar,
  BookOpen,
  Loader2,
  MapPin,
  Briefcase,
  Users,
  Phone,
  GraduationCap,
  Trophy,
  Clock,
  FileText,
  MoreHorizontal,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const StudentProfile = () => {
  const { user } = useAuthStore();
  const { student, isLoading, error, getProfileStudent } = useStudentStore();
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    if (user?.id) {
      getProfileStudent();
    }
  }, [user?.id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Không thể tải thông tin học sinh");
    }
  }, [error]);

  // Calculate profile completion
  useEffect(() => {
    if (student) {
      let completed = 0;
      const fields = [
        student.user_id?.full_name,
        student.user_id?.email,
        student.student_code,
        student.school_name,
        student.grade_level,
        student.current_class,
        student.learning_style,
        student.difficulty_preference,
      ];

      completed = fields.filter((field) => field).length;
      const percentage = Math.round((completed / fields.length) * 100);
      setProfileCompletion(percentage);
    }
  }, [student]);

  const navigate = useNavigate();

  const handleGo = () => {
    navigate("/student/dashboard/ai-tutors");
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
        <div className=" absolute  max-w-7xl mx-auto px-6 -mt-20 left-0 right-0">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-secondary)] flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                  {student?.user_id?.avatar ? (
                    <img
                      src={student.user_id.avatar}
                      alt={student.user_id.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    student?.user_id?.full_name?.charAt(0).toUpperCase() || "S"
                  )}
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {student?.user_id?.full_name || "Học sinh"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm">Học sinh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--color-primary-light)]" />
                    <span className="text-sm">
                      {student?.school_name || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Tham gia{" "}
                      {new Date(student?.created_at || "").toLocaleDateString(
                        "vi-VN",
                        { month: "long", year: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleGo}
                  className="bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-dark)] text-white gap-2"
                >
                  <Bot className="w-4 h-4" />
                  Đi đến trang trợ lý học tập AI
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
                  Thông tin
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-primary-light)] rounded-none px-4 py-2"
                >
                  Khóa học
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[var(--color-primary-light)] rounded-none px-4 py-2"
                >
                  Thành tích
                  <Badge className="ml-2 bg-[var(--color-accent)]">12</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Sidebar */}
                  <div className="space-y-6">
                    {/* Profile Completion */}
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

                    {/* About */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Giới thiệu
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-3 text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{student?.user_id?.full_name || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <School className="w-4 h-4" />
                            <span>
                              {student?.current_class || "Chưa có lớp"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <Briefcase className="w-4 h-4" />
                            <span>Mã HS: {student?.student_code || "N/A"}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Contacts */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Liên hệ
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Email
                              </p>
                              <p className="text-gray-700 break-all">
                                {student?.user_id?.email || "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 mb-1">
                                Điện thoại
                              </p>
                              <p className="text-gray-700">
                                {student?.user_id?.phone || "Chưa cập nhật"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Learning Stats */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Học tập
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-3 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>Khối {student?.grade_level || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                            <BookOpen className="w-4 h-4" />
                            <span className="capitalize">
                              {student?.learning_style || "Chưa xác định"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Content - Activity Stream */}
                  <div className="lg:col-span-2">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-semibold text-gray-900">
                            Hoạt động gần đây
                          </h3>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-6">
                          {/* Activity Item 1 */}
                          <div className="flex gap-4">
                            <div className="relative">
                              <div className="w-2 h-2 bg-[var(--color-primary-light)] rounded-full mt-2"></div>
                              <div className="absolute top-4 left-1 w-0.5 h-full bg-gray-200"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-900">
                                  Hoàn thành bài tập - Toán học nâng cao
                                </p>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />5 phút trước
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="border rounded-lg p-3 hover:border-[var(--color-primary-light)] transition-colors cursor-pointer">
                                  <div className="flex items-center gap-2 mb-1">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-medium">
                                      Bài 1.pdf
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    2.3kb
                                  </span>
                                </div>
                                <div className="border rounded-lg p-3 hover:border-[var(--color-primary-light)] transition-colors cursor-pointer">
                                  <div className="flex items-center gap-2 mb-1">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-medium">
                                      Bài 2.pdf
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    1.8kb
                                  </span>
                                </div>
                                <div className="border rounded-lg p-3 hover:border-[var(--color-primary-light)] transition-colors cursor-pointer">
                                  <div className="flex items-center gap-2 mb-1">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs font-medium">
                                      Bài 3.pdf
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    3.1kb
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Activity Item 2 */}
                          <div className="flex gap-4">
                            <div className="relative">
                              <div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full mt-2"></div>
                              <div className="absolute top-4 left-1 w-0.5 h-full bg-gray-200"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm font-medium text-gray-900">
                                  Đạt điểm cao trong bài kiểm tra
                                </p>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />3 giờ trước
                                </span>
                              </div>
                              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-100">
                                <div className="flex items-center gap-3">
                                  <Trophy className="w-8 h-8 text-yellow-500" />
                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      Điểm: 9.5/10
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Môn Toán - Chủ đề: Hàm số
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Activity Item 3 */}
                          <div className="flex gap-4">
                            <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <p className="text-sm font-medium text-gray-900">
                                  Thêm 3 ảnh mới vào thư viện
                                </p>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Hôm qua
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-200 to-purple-300 overflow-hidden">
                                  <img
                                    src="https://picsum.photos/400/300?random=1"
                                    alt="Study"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-200 to-pink-300 overflow-hidden">
                                  <img
                                    src="https://picsum.photos/400/300?random=2"
                                    alt="Study"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="aspect-video rounded-lg bg-gradient-to-br from-pink-200 to-orange-300 overflow-hidden">
                                  <img
                                    src="https://picsum.photos/400/300?random=3"
                                    alt="Study"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* View More */}
                          <button className="w-full py-3 text-sm text-[var(--color-primary-light)] hover:bg-gray-50 rounded-lg transition-colors font-medium">
                            Xem thêm
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="courses">
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Danh sách khóa học đang được phát triển
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Danh sách thành tích đang được phát triển
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
