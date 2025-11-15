import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Assignment from "@/@core/components/dashboard/teacher/Assignment";
import Grade from "@/@core/components/dashboard/teacher/StudentGrade";
import Quiz from "@/@core/components/dashboard/teacher/Quiz";
import Document from "@/@core/components/dashboard/teacher/Document";


const StudentClasses = () => {
  return (
    <div className="space-y-1">
      {/* Header */}
        <div className="bg-white dark:backdrop-blur-xl dark:bg-white/10 border border-white/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-light mb-1">
              Chào mừng bạn quay trở lại lớp học online
            </h1>
            <p className="text-primary-light text-sm">
              chúc bạn một ngày học vui vẻ và thành công trong học tập.
            </p>
          </div>
        </div>
      </div>
      {/* Body */}
        {/* Nội dung chính: Tabs */}
        <main className=" w-full bg-white dark:backdrop-blur-xl dark:bg-white/10 border border-white/20  p-2.5">
          <Tabs defaultValue="students" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList className="bg-[var(--color-secondary)] text-white text-xl">
                <TabsTrigger value="assignments">Bài tập</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="grades">Điểm số</TabsTrigger>
                <TabsTrigger value="documents">Tài liệu</TabsTrigger>
              </TabsList>
              <div>
              </div>
            </div>
            <TabsContent value="assignments">
              <Assignment />
            </TabsContent>
            <TabsContent value="quiz">
              <Quiz />
            </TabsContent>
            <TabsContent value="grades">
              {/* <Grade /> */}
            </TabsContent>
            <TabsContent value="documents">
              <Document />
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
};

export default StudentClasses;
