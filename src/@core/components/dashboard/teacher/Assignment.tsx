"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  Calendar,
  Target,
  BookOpen,
  ArrowBigUpDash,
} from "lucide-react";
import { storage } from "@/utility";
import { IUser } from "@/domain/interfaces/IUser";

// Types based on entity schema
interface Assignment {
  id: string;
  class_id: string;
  code: string;
  title: string;
  description: string;
  subject_id: string;
  due_date: string;
  max_score: number;
  total_submitted: number;
  total_unsubmitted: number;
  passing_score: number;
  attachments: string[];
  auto_grade_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

interface StudentAssignment {
  id: string;
  student_id: string;
  student_name?: string;
  student_code?: string;
  assignment_id: string;
  submission_file?: string;
  submission_text?: string;
  submitted_at?: string;
  due_date: string;
  score?: number;
  feedback?: string;
  status: "submitted" | "graded" | "pending" | "late";
  graded_at?: string;
  graded_by?: string;
}

interface AssignmentData {
  assignments: Assignment[];
  submissions?: StudentAssignment[];
}

// Mock data
const getData = async (): Promise<AssignmentData> => {
  return {
    assignments: [
      {
        id: "1",
        class_id: "class_1",
        code: "AS001",
        title: "Bài tập Toán - Hàm số bậc 2",
        description:
          "Giải các bài tập về hàm số bậc 2, vẽ đồ thị và phân tích tính chất",
        subject_id: "TOAN",
        due_date: "2024-11-10T23:59:00Z",
        max_score: 10,
        total_submitted: 15,
        total_unsubmitted: 5,
        passing_score: 5,
        attachments: ["document.pdf", "exercises.docx"],
        auto_grade_enabled: false,
        created_at: "2024-11-01T08:00:00Z",
        updated_at: "2024-11-03T22:13:00Z",
      },
      {
        id: "2",
        class_id: "class_1",
        code: "AS002",
        title: "Bài tập Lý - Định luật Newton",
        description:
          "Áp dụng định luật Newton để giải các bài toán về chuyển động",
        subject_id: "LY",
        due_date: "2024-11-15T23:59:00Z",
        max_score: 10,
        total_submitted: 8,
        total_unsubmitted: 12,
        passing_score: 5,
        attachments: [],
        auto_grade_enabled: true,
        created_at: "2024-11-02T10:30:00Z",
        updated_at: "2024-11-03T17:45:00Z",
      },
      {
        id: "3",
        class_id: "class_1",
        code: "AS003",
        title: "Bài tập Hóa - Bảng tuần hoàn",
        description:
          "Nghiên cứu về các nguyên tố hóa học và tính chất của chúng",
        subject_id: "HOA",
        due_date: "2024-11-20T23:59:00Z",
        max_score: 10,
        total_submitted: 0,
        total_unsubmitted: 20,
        passing_score: 5,
        attachments: ["periodic_table.pdf"],
        auto_grade_enabled: false,
        created_at: "2024-11-03T14:00:00Z",
      },
    ],
    submissions: [
      {
        id: "sub_1",
        student_id: "student_1",
        student_name: "Nguyễn Văn An",
        student_code: "HS001",
        assignment_id: "1",
        submission_text: "Đã hoàn thành tất cả bài tập",
        submitted_at: "2024-11-05T20:30:00Z",
        due_date: "2024-11-10T23:59:00Z",
        score: 9,
        feedback: "Bài làm tốt, cần chú ý phần vẽ đồ thị",
        status: "graded",
        graded_at: "2024-11-06T10:00:00Z",
        graded_by: "teacher_1",
      },
      {
        id: "sub_2",
        student_id: "student_2",
        student_name: "Trần Thị Bình",
        student_code: "HS002",
        assignment_id: "1",
        submission_text: "Bài làm của em",
        submitted_at: "2024-11-08T15:00:00Z",
        due_date: "2024-11-10T23:59:00Z",
        status: "submitted",
      },
    ],
  };
};

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  return `${diffDays} ngày trước`;
};

const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date();
};

// Assignment Detail Dialog
const AssignmentDetailDialog = ({
  assignment,
  submissions,
  isOpen,
  onClose,
}: {
  assignment: Assignment;
  submissions: StudentAssignment[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const assignmentSubmissions = submissions.filter(
    (sub) => sub.assignment_id === assignment.id
  );

  const graded = assignmentSubmissions.filter(
    (s) => s.status === "graded"
  ).length;
  const submitted = assignmentSubmissions.filter(
    (s) => s.status === "submitted"
  ).length;
  const pending = assignment.total_unsubmitted;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">
                {assignment.title}
              </DialogTitle>
              <DialogDescription className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {assignment.code}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Hạn nộp: {formatDate(assignment.due_date)}
                </span>
                {isOverdue(assignment.due_date) && (
                  <Badge variant="destructive">Đã quá hạn</Badge>
                )}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Sửa
              </Button>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                Xóa
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Thông tin</TabsTrigger>
            <TabsTrigger value="submissions">
              Bài nộp ({assignmentSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="statistics">Thống kê</TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Mô tả
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                {assignment.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                  <Target className="h-4 w-4" />
                  Điểm tối đa
                </div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {assignment.max_score}
                </div>
              </div>

              <div className="space-y-2 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Điểm đạt
                </div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {assignment.passing_score}
                </div>
              </div>
            </div>

            {/* Attachments */}
            {assignment.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Tài liệu đính kèm</h3>
                <div className="space-y-2">
                  {assignment.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{file}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Auto Grade */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm font-medium">Chấm điểm tự động</span>
              <Badge
                variant={
                  assignment.auto_grade_enabled ? "default" : "secondary"
                }
              >
                {assignment.auto_grade_enabled ? "Bật" : "Tắt"}
              </Badge>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div>Tạo lúc: {formatDate(assignment.created_at || "")}</div>
              {assignment.updated_at && (
                <div>Cập nhật: {getTimeAgo(assignment.updated_at)}</div>
              )}
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Danh sách bài nộp</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Tải tất cả
                </Button>
              </div>

              {assignmentSubmissions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Học sinh</TableHead>
                      <TableHead>Mã HS</TableHead>
                      <TableHead>Thời gian nộp</TableHead>
                      <TableHead>Điểm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignmentSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          {submission.student_name}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {submission.student_code}
                        </TableCell>
                        <TableCell className="text-sm">
                          {submission.submitted_at
                            ? formatDate(submission.submitted_at)
                            : "Chưa nộp"}
                        </TableCell>
                        <TableCell>
                          {submission.score !== undefined ? (
                            <span className="font-semibold text-green-600">
                              {submission.score}/{assignment.max_score}
                            </span>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              submission.status === "graded"
                                ? "default"
                                : submission.status === "submitted"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {submission.status === "graded"
                              ? "Đã chấm"
                              : submission.status === "submitted"
                              ? "Đã nộp"
                              : "Chưa nộp"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Chưa có bài nộp nào</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg text-center">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {graded}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Đã chấm điểm
                  </div>
                </div>

                <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    {submitted}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Chờ chấm
                  </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <XCircle className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {pending}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Chưa nộp
                  </div>
                </div>
              </div>

              {/* Completion Rate */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
                <h3 className="font-semibold mb-4">Tỷ lệ hoàn thành</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Đã nộp</span>
                    <span className="font-semibold">
                      {Math.round(
                        (assignment.total_submitted /
                          (assignment.total_submitted +
                            assignment.total_unsubmitted)) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{
                        width: `${
                          (assignment.total_submitted /
                            (assignment.total_submitted +
                              assignment.total_unsubmitted)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Average Score */}
              {graded > 0 && (
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border">
                  <h3 className="font-semibold mb-4">Điểm trung bình</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">
                      {(
                        assignmentSubmissions
                          .filter((s) => s.score !== undefined)
                          .reduce((sum, s) => sum + (s.score || 0), 0) / graded
                      ).toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      / {assignment.max_score} điểm
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

// Main Assignment Component
const Assignment = () => {
  const user: IUser | null = storage.getUser();
  console.log(user);

  const [data, setData] = useState<AssignmentData>({
    assignments: [],
    submissions: [],
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData().then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openDetail = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {
              user?.role === "teacher" ? "Bài tập" : "Danh sách bài tập"
            
            }
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {user?.role === "teacher" ? "Quản lý bài tập" : ""}
          </p>
        </div>

        {/* Create Button */}
        {user?.role === "teacher" && (
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-[#0077CC] hover:scale-105 text-white font-medium rounded-full shadow-md transition-all hover:shadow-lg">
            <Plus className="w-5 h-5" />
            Tạo bài tập
          </button>
        )}
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {data.assignments.map((assignment) => {
          const isExpanded = expandedId === assignment.id;
          const isLate = isOverdue(assignment.due_date);

          return (
            <div
              key={assignment.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all ${
                isExpanded ? "shadow-md" : ""
              }`}
            >
              {/* Assignment Header */}
              <div className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mr-4 shadow-md">
                  <FileText className="w-6 h-6" />
                </div>

                {/* Title and Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {assignment.title}
                    </h3>
                    {isLate && (
                      <Badge variant="destructive" className="text-xs">
                        Quá hạn
                      </Badge>
                    )}
                    {assignment.auto_grade_enabled && (
                      <Badge variant="secondary" className="text-xs">
                        Auto
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Hạn: {formatDate(assignment.due_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {assignment.total_submitted +
                        assignment.total_unsubmitted}{" "}
                      học sinh
                    </span>
                    {assignment.updated_at && (
                      <span className="text-xs">
                        Cập nhật {getTimeAgo(assignment.updated_at)}
                      </span>
                    )}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="mr-5">
                  <ArrowBigUpDash className="h-4 w-4 mr-2" />
                  nộp bài
                </Button>

                {/* Quick Stats */}
                <div className="hidden md:flex items-center gap-6 mr-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      {assignment.total_submitted}
                    </div>
                    <div className="text-xs text-gray-500">Đã nộp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-600">
                      {assignment.total_unsubmitted}
                    </div>
                    <div className="text-xs text-gray-500">Chưa nộp</div>
                  </div>
                </div>

                {/* Menu Button */}
                {user?.role === "teacher" && (
                  <button
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    aria-label="Tùy chọn"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                )}
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="px-6 pb-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
                  {/* Description Preview */}
                  <div className="py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {assignment.description}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 py-4">
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-semibold text-green-600">
                        {assignment.total_submitted}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Đã nộp
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-semibold text-blue-600">
                        {data.submissions?.filter(
                          (s) =>
                            s.assignment_id === assignment.id &&
                            s.status === "graded"
                        ).length || 0}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Đã chấm
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-semibold text-gray-600">
                        {assignment.total_unsubmitted}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Chưa nộp
                      </div>
                    </div>
                  </div>

                  {/* Attachments */}
                  {assignment.attachments.length > 0 && (
                    <div className="py-3">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tài liệu đính kèm:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((file, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    {user?.role === "teacher" && (
                      <>
                        <Button
                          onClick={() => openDetail(assignment)}
                          variant="default"
                          size="sm"
                          className="flex-1 sm:flex-none"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={() => toggleExpand(assignment.id)}
                className="w-full px-6 py-3 bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>{isExpanded ? "Thu gọn" : "Xem thêm"}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Detail Dialog */}
      {selectedAssignment && (
        <AssignmentDetailDialog
          assignment={selectedAssignment}
          submissions={data.submissions || []}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </div>
  );
};

export default Assignment;
