import { create } from "zustand";
import chatbotAPI from "@/infra/apiRAG/chatbot/chatbotAPI";
import {
  ICreateSessionResponse,
  IRagQueryResponse,
  ISessionHistoryResponse,
  ISessionDetailResponse,
  ISessionItem,
  IConversationPair,
} from "@/infra/apiRAG/type/IRag";
import { handleApiError } from "../lib/errorHandler";
import { IApiError } from "../lib/IError";

interface ChatBotState {
  // State
  currentSession: ICreateSessionResponse | null;
  sessionHistory: ISessionItem[];
  sessionDetail: ISessionDetailResponse | null;
  conversation: IConversationPair[];
  isLoading: boolean;
  isSending: boolean;
  error: IApiError | null;

  // Actions
  createSession: (userId: string) => Promise<void>;
  sendMessage: (sessionId: string, userInput: string, studentId: string, image?: File) => Promise<void>;
  getSessionHistory: (studentId: string) => Promise<void>;
  getSessionDetail: (sessionId: string, studentId: string) => Promise<void>;
  deleteSession: (sessionId: string, studentId: string) => Promise<void>;
  
  // Setters
  setCurrentSession: (session: ICreateSessionResponse | null) => void;
  setConversation: (conversation: IConversationPair[]) => void;
  addMessageToConversation: (message: IConversationPair) => void;
  
  // Clear functions
  clearCurrentSession: () => void;
  clearSessionHistory: () => void;
  clearSessionDetail: () => void;
  clearError: () => void;
  clearAll: () => void;
}

// ✅ Helper function to parse user_input from backend
const parseUserInput = (userInput: string): { image?: string; content: string } => {
  // Regex to extract markdown image: ![alt](url)
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = userInput.match(imageRegex);
  
  if (match) {
    const imageUrl = match[1]; // Extract URL from markdown
    const content = userInput.replace(imageRegex, '').trim(); // Remove image markdown, keep text
    return { image: imageUrl, content };
  }
  
  return { content: userInput };
};

export const useChatBotStore = create<ChatBotState>()((set, get) => ({
  // Initial State
  currentSession: null,
  sessionHistory: [],
  sessionDetail: null,
  conversation: [],
  isLoading: false,
  isSending: false,
  error: null,

  /**
   * 🔹 Tạo phiên chat mới
   */
  createSession: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await chatbotAPI.createSession(userId);

      set({
        currentSession: response,
        conversation: [],
        isLoading: false,
      });
    } catch (error) {
      const apiError = handleApiError(error);

      set({
        isLoading: false,
        error: apiError,
        currentSession: null,
      });

      throw apiError;
    }
  },

  deleteSession: async (sessionId: string, studentId: string) => {
    try {
      set({ isLoading: true, error: null });

      await chatbotAPI.deleteSession(sessionId, studentId);

      set({
        isLoading: false,
      });
    } catch (error) {
      const apiError = handleApiError(error);

      set({
        isLoading: false,
        error: apiError,
      });

      throw apiError;
    }
  },

  /**
   * 🔹 Gửi tin nhắn và nhận phản hồi
   */
  /**
 * 🔹 Gửi tin nhắn và nhận phản hồi - WITH OPTIMISTIC UPDATE
 */
sendMessage: async (sessionId: string, userInput: string, studentId: string, image?: File) => {
  try {
    set({ isSending: true, error: null });

    // ✅ 1. Tạo preview URL local cho ảnh
    const localImagePreview = image ? URL.createObjectURL(image) : undefined;

    // ✅ 2. OPTIMISTIC UPDATE - Hiển thị message của user ngay lập tức
    const optimisticMessage: IConversationPair = {
      user: {
        content: userInput,
        timestamp: new Date().toISOString(),
        image: localImagePreview,
      },
      chatbot: {
        content: "", // Placeholder, sẽ update sau
        timestamp: new Date().toISOString(),
      },
    };

    // Thêm message tạm vào conversation
    set({
      conversation: [...get().conversation, optimisticMessage],
    });

    // ✅ 3. Gọi API
    const response: IRagQueryResponse = await chatbotAPI.sendMessage(
      sessionId,
      userInput,
      studentId,
      image
    );

    // ✅ 4. Parse user_input từ backend
    const parsed = parseUserInput(response.user_input);

    // ✅ 5. Update lại message với data thật từ server
    const updatedMessage: IConversationPair = {
      user: {
        content: parsed.content, // Text đã parse
        timestamp: new Date().toISOString(),
        image: parsed.image || localImagePreview, // Ưu tiên server URL
      },
      chatbot: {
        content: response.response,
        timestamp: new Date().toISOString(),
      },
    };

    // Replace optimistic message với message thật
    set((state) => ({
      conversation: [
        ...state.conversation.slice(0, -1), // Remove optimistic message
        updatedMessage, // Add real message
      ],
      isSending: false,
    }));

    // Cập nhật message_count
    if (get().currentSession) {
      set({
        currentSession: {
          ...get().currentSession!,
          session: {
            ...get().currentSession!.session,
            message_count: get().currentSession!.session.message_count + 1,
          },
        },
      });
    }
  } catch (error) {
    const apiError = handleApiError(error);

    // ✅ Rollback optimistic update nếu lỗi
    set((state) => ({
      conversation: state.conversation.slice(0, -1), // Remove failed message
      isSending: false,
      error: apiError,
    }));

    throw apiError;
  }
},

  /**
   * 🔹 Lấy danh sách lịch sử phiên chat
   */
  getSessionHistory: async (studentId: string) => {
    try {
      set({ isLoading: true, error: null });

      const response: ISessionHistoryResponse =
        await chatbotAPI.getSessionHistory(studentId);

      set({
        sessionHistory: response.sessions || [],
        isLoading: false,
      });
    } catch (error) {
      const apiError = handleApiError(error);

      set({
        isLoading: false,
        error: apiError,
        sessionHistory: [],
      });

      throw apiError;
    }
  },

  /**
   * 🔹 Lấy chi tiết 1 phiên chat
   */
  getSessionDetail: async (sessionId: string, studentId: string) => {
    try {
      set({ isLoading: true, error: null });

      const response: ISessionDetailResponse =
        await chatbotAPI.getSessionDetail(sessionId, studentId);

      // ✅ Parse tất cả user_input trong conversation history
      const parsedConversation = response.conversation?.map((pair) => {
        const parsed = parseUserInput(pair.user.content);
        return {
          user: {
            ...pair.user,
            content: parsed.content,
            image: parsed.image,
          },
          chatbot: pair.chatbot,
        };
      }) || [];

      set({
        sessionDetail: response,
        conversation: parsedConversation,
        isLoading: false,
      });
    } catch (error) {
      const apiError = handleApiError(error);

      set({
        isLoading: false,
        error: apiError,
        sessionDetail: null,
        conversation: [],
      });

      throw apiError;
    }
  },

  // Setters
  setCurrentSession: (session: ICreateSessionResponse | null) => {
    set({ currentSession: session });
  },

  setConversation: (conversation: IConversationPair[]) => {
    set({ conversation });
  },

  addMessageToConversation: (message: IConversationPair) => {
    set({
      conversation: [...get().conversation, message],
    });
  },

  // Clear functions
  clearCurrentSession: () => {
    set({ 
      currentSession: null, 
      conversation: [],
      error: null 
    });
  },

  clearSessionHistory: () => {
    set({ sessionHistory: [], error: null });
  },

  clearSessionDetail: () => {
    set({ 
      sessionDetail: null, 
      conversation: [],
      error: null 
    });
  },

  clearError: () => {
    set({ error: null });
  },

  clearAll: () => {
    set({
      currentSession: null,
      sessionHistory: [],
      sessionDetail: null,
      conversation: [],
      isLoading: false,
      isSending: false,
      error: null,
    });
  },
}));