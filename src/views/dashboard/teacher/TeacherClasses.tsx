import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Classes from "@/@core/components/dashboard/teacher/Classes";
import Assignment from "@/@core/components/dashboard/teacher/Assignment";
import StudentGrade from "@/@core/components/dashboard/teacher/StudentGrade";
import Student from "@/@core/components/dashboard/teacher/Student";
import Quiz from "@/@core/components/dashboard/teacher/Quiz";
import Document from "@/@core/components/dashboard/teacher/Document";



import { useClassStore } from "@/utility/stores/classesStore";


const TeacherClasses = () => {
   const { getIdClass } = useClassStore();
  const selectedClassId = getIdClass();
  return (
    <div className="space-y-1">

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-1 w-full">
        {/* Sidebar phải: Bộ lọc + Danh sách lớp học */}
        <Classes />

        {/* Nội dung chính: Tabs */}
        <main className="lg:w-4/5 w-full bg-white dark:backdrop-blur-xl dark:bg-white/10 border border-white/20  p-2.5">
          <Tabs defaultValue="students" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList className="bg-[var(--color-secondary)] text-white text-xl">
                <TabsTrigger value="students">Học sinh</TabsTrigger>
                <TabsTrigger value="assignments">Bài tập</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="grades">Điểm số</TabsTrigger>
                <TabsTrigger value="documents">Tài liệu</TabsTrigger>
              </TabsList>
              
            </div>
            <TabsContent value="students">
                {selectedClassId && <Student classId={selectedClassId} />}
            </TabsContent>
            <TabsContent value="assignments">
              <Assignment />
            </TabsContent>
            <TabsContent value="quiz">
              <Quiz />
            </TabsContent>
            <TabsContent value="grades">
              <StudentGrade />
            </TabsContent>
            <TabsContent value="documents">
              <Document />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TeacherClasses;
