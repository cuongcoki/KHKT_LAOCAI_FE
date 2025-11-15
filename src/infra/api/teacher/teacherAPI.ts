import axiosInstance from "../conflig/axiosInstance";
import { API_ENDPOINTS } from "../conflig/apiEndpoints";
import { IClassResponse } from "@/domain/interfaces/IClass";
import { ITeacherResponseData } from "@/domain/interfaces/ITeacher";

class ClassAPI {
  /**
   * Lấy danh sách comments theo blogId
   */
  async getClassesByTeacher(teacherId: string): Promise<IClassResponse> {
    const response = await axiosInstance.get<IClassResponse>(
      API_ENDPOINTS.CLASSES.GETCLASSBYTEACCHER(teacherId)
    );
    return response.data;
  }

  async getProfileTeacher(): Promise<ITeacherResponseData> {
    const response = await axiosInstance.get<ITeacherResponseData>(
      API_ENDPOINTS.TEACHER.GETPROFILE
    );
    return response.data;
  }
}

export default new ClassAPI();
