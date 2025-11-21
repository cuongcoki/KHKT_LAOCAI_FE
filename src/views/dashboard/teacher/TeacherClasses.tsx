import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Classes from "@/@core/components/dashboard/teacher/Classes";
import Assignment from "@/@core/components/dashboard/teacher/Assignment";
import StudentGrade from "@/@core/components/dashboard/teacher/StudentGrade";
import Student from "@/@core/components/dashboard/teacher/Student";
import Quiz from "@/@core/components/dashboard/teacher/Quiz";
import Document from "@/@core/components/dashboard/teacher/Document";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useClassStore } from "@/utility/stores/classesStore";
import { useState } from "react";

const TeacherClasses = () => {
  const { getIdClass } = useClassStore();
  const selectedClassId = getIdClass();

  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubjectChange = (subjectId : string) => {
    console.log("ID môn học được chọn:", subjectId);
    setSelectedSubject(subjectId);
  };

  return (
    <div className="space-y-1">
      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-1 w-full">
        {/* Sidebar phải: Bộ lọc + Danh sách lớp học */}
        <Classes />

        {/* Nội dung chính: Tabs */}
        <main className="lg:w-4/5 w-full bg-white dark:backdrop-blur-xl dark:bg-white/10 border border-white/20 p-2.5">
          <Tabs defaultValue="students" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList className="bg-[var(--color-secondary)] text-white text-xl">
                <TabsTrigger value="students">Học sinh</TabsTrigger>
                <TabsTrigger 
                  value="assignments" 
                  disabled={!selectedSubject}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Bài tập
                </TabsTrigger>
                <TabsTrigger 
                  value="quiz" 
                  disabled={!selectedSubject}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Bài kiểm tra
                </TabsTrigger>
                <TabsTrigger 
                  value="grades" 
                  disabled={!selectedSubject}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Điểm số
                </TabsTrigger>
                <TabsTrigger 
                  value="documents" 
                  disabled={!selectedSubject}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tài liệu
                </TabsTrigger>
              </TabsList>

              <div className="flex flex-col items-end gap-1">
                <Select onValueChange={handleSubjectChange} value={selectedSubject}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn môn học" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Môn học</SelectLabel>
                      <SelectItem value="690d75bcd9f6d86227089d81">Toán</SelectItem>
                      <SelectItem value="690d75cfd9f6d86227089d85">Vật Lý</SelectItem>
                      <SelectItem value="690d75d6d9f6d86227089d89">Hóa</SelectItem>
                      <SelectItem value="690d75dad9f6d86227089d8d">Sinh</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {!selectedSubject && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    * Chọn môn học để xem các tab khác
                  </p>
                )}
              </div>
            </div>

            <TabsContent value="students">
              {selectedClassId && <Student classId={selectedClassId} />}
            </TabsContent>
            <TabsContent value="assignments">
              {selectedSubject && <Assignment subjectId={selectedSubject} classId={selectedClassId} />}
            </TabsContent>
            <TabsContent value="quiz">
              {selectedSubject && <Quiz subjectId={selectedSubject} />}
            </TabsContent>
            <TabsContent value="grades">
              {selectedSubject && <StudentGrade subjectId={selectedSubject} />}
            </TabsContent>
            <TabsContent value="documents">
              {selectedSubject && <Document subjectId1={selectedSubject} />}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TeacherClasses;