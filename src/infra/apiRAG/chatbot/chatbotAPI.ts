import axiosInstance from "../conflig/axiosInstance";
import { API_ENDPOINTS } from "../conflig/apiEndpoints";

class ChatBotAPI {
  /**
   * 🔹 Tạo phiên chat mới (session)
   * @param userId - ID của người dùng
   */
  async createSession(userId: string) {
    const response = await axiosInstance.post(
      API_ENDPOINTS.RAG.CREATE_SESSIONS(userId)
    );
    return response.data;
  }

  /**
   * 🔹 Gửi câu hỏi đến RAG model và nhận phản hồi
   * @param session_id - ID của phiên chat hiện tại
   * @param user_input - Tin nhắn người dùng nhập vào
   */
async sendMessage(session_id: string, user_input: string, student_id: string, image?: File) {
  const formData = new FormData();
  formData.append('session_id', session_id);
  formData.append('user_input', user_input);
  formData.append('student_id', student_id);
  
  if (image) {
    formData.append('image', image);
  }

  const response = await axiosInstance.post(
    API_ENDPOINTS.RAG.RAG_QUERY,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
}


  /**
   * 🔹 Lấy danh sách lịch sử phiên chat của 1 học sinh
   * @param student_id - ID học sinh
   */
  async getSessionHistory(student_id: string) {
    const response = await axiosInstance.get(
      API_ENDPOINTS.RAG.GET_SESSION_HISTORY(student_id)
    );
    return response.data;
  }

  /**
   * 🔹 Lấy chi tiết 1 phiên chat cụ thể
   * @param session_id - ID phiên chat
   * @param student_id - ID học sinh
   */
  async getSessionDetail(session_id: string, student_id: string) {
    const response = await axiosInstance.get(
      API_ENDPOINTS.RAG.GET_SESSION_DETAIL(session_id, student_id)
    );
    return response.data;
  }

  async deleteSession(session_id: string, student_id: string) {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.RAG.DELETE_SESSION(session_id, student_id)
    );
    return response.data;
  }

}

export default new ChatBotAPI();
