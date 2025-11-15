import { create } from "zustand";
import enrollmentsAPI from "@/infra/api/enrollments/enrollmentsAPI";
import { IEnrollmentItem } from "@/domain/interfaces/IErollment";
import { handleApiError } from "../lib/errorHandler";
import { IApiError } from "../lib/IError";

interface EnrollmentState {
  // State
  enrollments: IEnrollmentItem[];
  isLoading: boolean;
   error: IApiError | null;
  // Actions
  getEnrollmentsByClass: (classId: string) => Promise<void>;
  setEnrollments: (enrollments: IEnrollmentItem[]) => void;
  clearEnrollments: () => void;
  clearError: () => void;
}

export const useEnrollmentStore = create<EnrollmentState>()((set, get) => ({
  // Initial State
  enrollments: [],
  isLoading: false,
  error: null,

  /**
   * Lấy danh sách enrollments theo classId
   */
  getEnrollmentsByClass: async (classId: string) => {
    try {
      set({ isLoading: true, error: null });

      const response = await enrollmentsAPI.getEnrollmentsByClass(classId);

      set({
        enrollments: response.data || [],
        isLoading: false,
      });

      // toast.success("Tải danh sách học viên thành công!");
    } catch (error) {
      const apiError = handleApiError(error);

      set({
        error: apiError,
        isLoading: false,
        enrollments: [],
      });

      throw error;
    }
  },

  /**
   * Set enrollments trực tiếp
   */
  setEnrollments: (enrollments: IEnrollmentItem[]) => {
    set({ enrollments });
  },

  /**
   * Clear danh sách enrollments
   */
  clearEnrollments: () => {
    set({ enrollments: [], error: null });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },
}));