"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Send,
  Save,
  Download,
  Eye,
  Mail,
  Award,
  AlertCircle,
  Users,
  BookOpen,
  Brain,
  ClipboardList,
} from "lucide-react";
import { IUser } from "@/domain/interfaces/IUser";
import { storage } from "@/utility";

// Types based on Entity Diagram
type GradeType = "quiz" | "assignment" | "ai_practice";
type GradeStatus = "graded" | "submitted" | "pending" | "late";

interface Student {
  id: string;
  user_id: string;
  avatar?: string;
  student_code: string;
  grade_level: number;
  current_class: string;
  school_name: string;
  learning_style: string;
  created_at: string;
  difficulty_preference: string;
  last_active: string;
  updated_at: string;
  name: string; // Display name from user
}

interface Grade {
  id: string;
  student_id: string;
  class_id: string;
  subject_id: string;
  grade_type: GradeType;
  score?: number;
  letter_grade?: string;
  semester: number;
  year: number;
  time_spent?: number;
  comments?: string;
  created_at: string;
  status: GradeStatus;
  max_score: number;
  submitted_at?: string;
  graded_at?: string;
}

// Mock data
const getMockData = () => {
  const students: Student[] = [
    {
      id: "1",
      user_id: "u001",
      name: "Nguyễn Văn An",
      student_code: "HS001",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "visual",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "medium",
      last_active: "2024-11-04T10:00:00Z",
      updated_at: "2024-11-04T10:00:00Z",
    },
    {
      id: "2",
      user_id: "u002",
      name: "Trần Thị Bình",
      student_code: "HS002",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "auditory",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "hard",
      last_active: "2024-11-04T08:00:00Z",
      updated_at: "2024-11-04T08:00:00Z",
    },
    {
      id: "3",
      user_id: "u003",
      name: "Lê Minh Châu",
      student_code: "HS003",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "kinesthetic",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "medium",
      last_active: "2024-11-03T20:00:00Z",
      updated_at: "2024-11-03T20:00:00Z",
    },
    {
      id: "4",
      user_id: "u004",
      name: "Phạm Văn Dũng",
      student_code: "HS004",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "visual",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "easy",
      last_active: "2024-11-04T09:00:00Z",
      updated_at: "2024-11-04T09:00:00Z",
    },
    {
      id: "5",
      user_id: "u005",
      name: "Hoàng Thị Ê",
      student_code: "HS005",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "reading",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "medium",
      last_active: "2024-11-03T22:00:00Z",
      updated_at: "2024-11-03T22:00:00Z",
    },
    {
      id: "6",
      user_id: "u006",
      name: "Vũ Hải Phong",
      student_code: "HS006",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "visual",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "hard",
      last_active: "2024-11-02T15:00:00Z",
      updated_at: "2024-11-02T15:00:00Z",
    },
    {
      id: "7",
      user_id: "u007",
      name: "Đỗ Thị Giang",
      student_code: "HS007",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "auditory",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "medium",
      last_active: "2024-11-04T11:00:00Z",
      updated_at: "2024-11-04T11:00:00Z",
    },
    {
      id: "8",
      user_id: "u008",
      name: "Ngô Minh Hiếu",
      student_code: "HS008",
      grade_level: 10,
      current_class: "10A1",
      school_name: "THPT Chu Văn An",
      learning_style: "kinesthetic",
      created_at: "2024-09-01T00:00:00Z",
      difficulty_preference: "easy",
      last_active: "2024-11-04T07:00:00Z",
      updated_at: "2024-11-04T07:00:00Z",
    },
  ];

  const grades: Grade[] = [
    {
      id: "g001",
      student_id: "1",
      class_id: "c001",
      subject_id: "s001",
      grade_type: "assignment",
      score: 9,
      letter_grade: "A",
      semester: 1,
      year: 2024,
      time_spent: 45,
      comments: "Bài làm tốt, cần chú ý phần vẽ đồ thị",
      created_at: "2024-11-03T20:30:00Z",
      status: "graded",
      max_score: 10,
      submitted_at: "2024-11-03T20:30:00Z",
      graded_at: "2024-11-04T10:00:00Z",
    },
    {
      id: "g002",
      student_id: "2",
      class_id: "c001",
      subject_id: "s001",
      grade_type: "quiz",
      semester: 1,
      year: 2024,
      time_spent: 30,
      created_at: "2024-11-04T08:15:00Z",
      status: "submitted",
      max_score: 10,
      submitted_at: "2024-11-04T08:15:00Z",
    },
    {
      id: "g003",
      student_id: "3",
      class_id: "c001",
      subject_id: "s001",
      grade_type: "ai_practice",
      score: 8.5,
      letter_grade: "B+",
      semester: 1,
      year: 2024,
      time_spent: 60,
      comments: "Giải thích rất chi tiết, cần cải thiện phần trình bày",
      created_at: "2024-11-04T15:45:00Z",
      status: "graded",
      max_score: 10,
      submitted_at: "2024-11-04T15:45:00Z",
      graded_at: "2024-11-04T16:30:00Z",
    },
    {
      id: "g004",
      student_id: "4",
      class_id: "c001",
      subject_id: "s001",
      grade_type: "assignment",
      semester: 1,
      year: 2024,
      time_spent: 40,
      created_at: "2024-11-05T10:30:00Z",
      status: "submitted",
      max_score: 10,
      submitted_at: "2024-11-05T10:30:00Z",
    },
    {
      id: "g005",
      student_id: "5",
      class_id: "c001",
      subject_id: "s001",
      grade_type: "quiz",
      semester: 1,
      year: 2024,
      time_spent: 25,
      created_at: "2024-11-05T23:59:00Z",
      status: "late",
      max_score: 10,
      submitted_at: "2024-11-05T23:59:00Z",
    },
    {
      id: "g007",
      student_id: "7",
      class_id: "c001",
      subject_id: "s001",
      grade_type: "assignment",
      score: 10,
      letter_grade: "A+",
      semester: 1,
      year: 2024,
      time_spent: 50,
      comments: "Xuất sắc! Bài làm hoàn hảo",
      created_at: "2024-11-03T18:00:00Z",
      status: "graded",
      max_score: 10,
      submitted_at: "2024-11-03T18:00:00Z",
      graded_at: "2024-11-04T09:00:00Z",
    },
    {
      id: "g008",
      student_id: "8",
      class_id: "c001",
      subject_id: "s001",
      grade_type: "ai_practice",
      semester: 1,
      year: 2024,
      time_spent: 35,
      created_at: "2024-11-04T22:00:00Z",
      status: "submitted",
      max_score: 10,
      submitted_at: "2024-11-04T22:00:00Z",
    },
  ];

  return { students, grades };
};

// Helper functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatTimeSpent = (minutes?: number) => {
  if (!minutes) return "N/A";
  if (minutes < 60) return `${minutes} phút`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const getGradeTypeIcon = (type: GradeType) => {
  switch (type) {
    case "quiz":
      return <ClipboardList className="w-4 h-4" />;
    case "assignment":
      return <BookOpen className="w-4 h-4" />;
    case "ai_practice":
      return <Brain className="w-4 h-4" />;
  }
};

const getGradeTypeBadge = (type: GradeType) => {
  switch (type) {
    case "quiz":
      return (
        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
          <ClipboardList className="w-3 h-3 mr-1" />
          Trắc nghiệm
        </Badge>
      );
    case "assignment":
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          <BookOpen className="w-3 h-3 mr-1" />
          Bài tập
        </Badge>
      );
    case "ai_practice":
      return (
        <Badge className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400">
          <Brain className="w-3 h-3 mr-1" />
          AI Practice
        </Badge>
      );
  }
};

const getStatusBadge = (status: GradeStatus) => {
  switch (status) {
    case "graded":
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Đã chấm
        </Badge>
      );
    case "submitted":
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
          <Clock className="w-3 h-3 mr-1" />
          Chờ chấm
        </Badge>
      );
    case "late":
      return (
        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
          <AlertCircle className="w-3 h-3 mr-1" />
          Nộp muộn
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <XCircle className="w-3 h-3 mr-1" />
          Chưa nộp
        </Badge>
      );
  }
};

// Main Component
const Grade = () => {

  const { students, grades } = getMockData();

  const [selectedStudent, setSelectedStudent] = useState<string | null>(
    students[1].id
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterGradeType, setFilterGradeType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Grading form state
  const [score, setScore] = useState<string>("");
  const [letterGrade, setLetterGrade] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  // Get student with grade
  const studentsWithGrades = students.map((student) => ({
    ...student,
    grade: grades.find((g) => g.student_id === student.id),
  }));

  const selectedStudentData = studentsWithGrades.find(
    (s) => s.id === selectedStudent
  );
  const grade = selectedStudentData?.grade;

  // Calculate stats
  const stats = {
    total: students.length,
    submitted: grades.filter(
      (g) => g.status === "submitted" || g.status === "late"
    ).length,
    graded: grades.filter((g) => g.status === "graded").length,
    pending: students.length - grades.length,
  };

  // Calculate stats by grade type
  const statsByType = {
    quiz: grades.filter((g) => g.grade_type === "quiz").length,
    assignment: grades.filter((g) => g.grade_type === "assignment").length,
    ai_practice: grades.filter((g) => g.grade_type === "ai_practice").length,
  };

  // Filter and sort students
  const filteredStudents = studentsWithGrades
    .filter((student) => {
      // Filter by status
      if (filterStatus !== "all") {
        if (filterStatus === "graded" && student.grade?.status !== "graded")
          return false;
        if (
          filterStatus === "submitted" &&
          student.grade?.status !== "submitted" &&
          student.grade?.status !== "late"
        )
          return false;
        if (filterStatus === "pending" && student.grade) return false;
      }

      // Filter by grade type
      if (filterGradeType !== "all") {
        if (!student.grade || student.grade.grade_type !== filterGradeType)
          return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "score") {
        const scoreA = a.grade?.score || 0;
        const scoreB = b.grade?.score || 0;
        return scoreB - scoreA;
      }
      if (sortBy === "date") {
        const dateA = a.grade?.submitted_at || "";
        const dateB = b.grade?.submitted_at || "";
        return dateB.localeCompare(dateA);
      }
      return 0;
    });

  // Auto-calculate letter grade
  const calculateLetterGrade = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "B+";
    if (percentage >= 75) return "B";
    if (percentage >= 70) return "C+";
    if (percentage >= 65) return "C";
    if (percentage >= 60) return "D+";
    if (percentage >= 50) return "D";
    return "F";
  };

  // Handle save grade
  const handleSaveGrade = async () => {
    if (!grade) return;

    setIsSaving(true);

    setTimeout(() => {
      console.log("Saving grade:", {
        gradeId: grade.id,
        score: parseFloat(score),
        letterGrade,
        comments,
      });

      setIsSaving(false);
      alert("Đã lưu điểm thành công!");
    }, 1000);
  };

  // Handle send grade
  const handleSendGrade = async () => {
    if (!grade || !score) return;

    setIsSaving(true);

    setTimeout(() => {
      console.log("Sending grade to student:", {
        gradeId: grade.id,
        score: parseFloat(score),
        letterGrade,
        comments,
      });

      setIsSaving(false);
      alert("Đã gửi điểm cho học sinh!");
    }, 1000);
  };

  // Auto-update letter grade when score changes
  const handleScoreChange = (value: string) => {
    setScore(value);
    if (value && grade) {
      const numScore = parseFloat(value);
      if (!isNaN(numScore)) {
        setLetterGrade(calculateLetterGrade(numScore, grade.max_score));
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Chấm điểm bài tập
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Môn Toán - Lớp 10A1 - Học kỳ 1/2024
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Stats Summary */}
          <div className="flex items-center gap-6 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {stats.graded}
              </div>
              <div className="text-xs text-gray-500">Đã chấm</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {stats.submitted}
              </div>
              <div className="text-xs text-gray-500">Chờ chấm</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-600">
                {stats.pending}
              </div>
              <div className="text-xs text-gray-500">Chưa nộp</div>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Main Content with Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Sidebar - Student List */}
        <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
          <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            {/* Sidebar Header */}
            <div className="p-4 space-y-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Danh sách học sinh ({filteredStudents.length}/{stats.total})
                </span>
              </div>

              {/* Grade Type Filter */}
              <Select
                value={filterGradeType}
                onValueChange={setFilterGradeType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Tất cả loại bài</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="quiz">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4" />
                      <span>Trắc nghiệm ({statsByType.quiz})</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="assignment">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Bài tập ({statsByType.assignment})</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ai_practice">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      <span>AI Practice ({statsByType.ai_practice})</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="submitted">Chờ chấm</SelectItem>
                  <SelectItem value="graded">Đã chấm</SelectItem>
                  <SelectItem value="pending">Chưa nộp</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sắp xếp theo tên</SelectItem>
                  <SelectItem value="score">Sắp xếp theo điểm</SelectItem>
                  <SelectItem value="date">Sắp xếp theo ngày nộp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Student List */}
            <div className="flex-1 overflow-y-auto">
              {filteredStudents.map((student) => {
                const isSelected = selectedStudent === student.id;
                const hasGrade = !!student.grade;

                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-l-4 ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-600"
                        : "border-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                      {student.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {student.student_code}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {hasGrade && student.grade && (
                        <>
                          <div className="flex items-center gap-1">
                            {getGradeTypeIcon(student.grade.grade_type)}
                            {getStatusBadge(student.grade.status)}
                          </div>
                          {student.grade.score !== undefined && (
                            <span className="text-sm font-bold text-green-600">
                              {student.grade.score}/{student.grade.max_score}
                            </span>
                          )}
                        </>
                      )}
                      {!hasGrade && (
                        <Badge variant="outline" className="text-xs">
                          Chưa nộp
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Grading Area */}
        <ResizablePanel defaultSize={70}>
          <div className="h-full flex flex-col overflow-y-auto">
            {!selectedStudentData && (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Chọn một học sinh để bắt đầu chấm điểm</p>
                </div>
              </div>
            )}

            {selectedStudentData && !grade && (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <XCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium mb-2">Chưa có bài nộp</p>
                  <p className="text-sm">Học sinh chưa nộp bài tập</p>
                </div>
              </div>
            )}

            {selectedStudentData && grade && (
              <div className="flex-1 p-6 space-y-6">
                {/* Student Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                      {selectedStudentData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {selectedStudentData.name}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{selectedStudentData.student_code}</span>
                        <span>•</span>
                        <span>Lớp {selectedStudentData.current_class}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getGradeTypeBadge(grade.grade_type)}
                    {getStatusBadge(grade.status)}
                  </div>
                </div>

                {/* Submission Info */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Loại bài tập
                      </div>
                      <div className="flex items-center gap-2">
                        {getGradeTypeIcon(grade.grade_type)}
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {grade.grade_type === "quiz" && "Trắc nghiệm"}
                          {grade.grade_type === "assignment" && "Bài tập"}
                          {grade.grade_type === "ai_practice" && "AI Practice"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Thời gian nộp
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {grade.submitted_at && formatDate(grade.submitted_at)}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Thời gian làm bài
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatTimeSpent(grade.time_spent)}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Học kỳ / Năm
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        HK{grade.semester} / {grade.year}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Xem bài làm
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Tải xuống
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Student Learning Profile */}
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    Hồ sơ học tập
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-blue-600 dark:text-blue-400">
                        Phong cách học:
                      </span>
                      <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                        {selectedStudentData.learning_style}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-600 dark:text-blue-400">
                        Độ khó ưa thích:
                      </span>
                      <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                        {selectedStudentData.difficulty_preference}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grading Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <Award className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Chấm điểm
                    </h3>
                  </div>

                  {/* Score Input */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Điểm số <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          min="0"
                          max={grade.max_score}
                          step="0.5"
                          value={score}
                          onChange={(e) => handleScoreChange(e.target.value)}
                          placeholder="Nhập điểm"
                          className="pr-20 text-lg font-semibold"
                          disabled={grade.status === "graded"}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          / {grade.max_score}
                        </span>
                      </div>
                      {score && parseFloat(score) > grade.max_score && (
                        <p className="text-xs text-red-500 mt-1">
                          Điểm không được vượt quá {grade.max_score}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Điểm chữ
                      </label>
                      <Input
                        type="text"
                        value={letterGrade}
                        onChange={(e) => setLetterGrade(e.target.value)}
                        placeholder="A+, A, B+..."
                        className="text-lg font-semibold"
                        disabled={grade.status === "graded"}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phần trăm
                      </label>
                      <div className="h-10 flex items-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {score
                            ? Math.round(
                                (parseFloat(score) / grade.max_score) * 100
                              )
                            : 0}
                          %
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nhận xét
                    </label>
                    <Textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Nhập nhận xét, góp ý cho học sinh..."
                      rows={5}
                      className="resize-none"
                      disabled={grade.status === "graded"}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {comments.length} ký tự
                    </p>
                  </div>

                  {/* Previous Grade (if exists) */}
                  {grade.status === "graded" && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                            Đã chấm điểm
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-green-700 dark:text-green-300">
                                Điểm:
                              </span>
                              <span className="font-bold text-green-900 dark:text-green-100">
                                {grade.score}/{grade.max_score} (
                                {grade.letter_grade})
                              </span>
                            </div>
                            {grade.comments && (
                              <div>
                                <span className="text-green-700 dark:text-green-300">
                                  Nhận xét:
                                </span>
                                <p className="text-green-800 dark:text-green-200 mt-1 p-2 bg-white dark:bg-gray-800 rounded">
                                  {grade.comments}
                                </p>
                              </div>
                            )}
                            <div className="text-xs text-green-600 dark:text-green-400 pt-2 border-t border-green-200 dark:border-green-800">
                              Chấm lúc:{" "}
                              {grade.graded_at && formatDate(grade.graded_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {grade.status !== "graded" && (
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        onClick={handleSaveGrade}
                        disabled={
                          !score ||
                          parseFloat(score) > grade.max_score ||
                          isSaving
                        }
                        variant="outline"
                        className="flex-1"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Đang lưu..." : "Lưu nháp"}
                      </Button>

                      <Button
                        onClick={handleSendGrade}
                        disabled={
                          !score ||
                          parseFloat(score) > grade.max_score ||
                          isSaving
                        }
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSaving ? "Đang gửi..." : "Gửi điểm"}
                      </Button>
                    </div>
                  )}

                  {grade.status === "graded" && (
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setScore(grade.score?.toString() || "");
                          setLetterGrade(grade.letter_grade || "");
                          setComments(grade.comments || "");
                        }}
                      >
                        Chỉnh sửa điểm
                      </Button>

                      <Button variant="outline" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Gửi lại thông báo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Grade;
