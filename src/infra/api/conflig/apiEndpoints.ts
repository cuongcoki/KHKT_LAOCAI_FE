/**
 * API Endpoints Configuration
 * Centralized API endpoint definitions
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/public/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },

  // Classes
  CLASSES: {
    GETCLASSBYTEACCHER: (teacherId: string) => `/private/classes/teacher/${teacherId}`,
  },

  // Teacher
  TEACHER:{
    GETPROFILE: "/private/teachers/profile",
  },

  // Student
  STUDENT: {
    GETPROFILE: "/private/students/profile",
  },

  // Enrollments
  ENROLLMENTS: {
    GETBYCLASS: (classId: string) => `/private/enrollments/class/${classId}`,
  },

  // notification
   NOTIFICATIONS: {
    CREATE: '/private/notifications',
    GET_ALL: '/private/notifications',
    MARK_READ: (id: string) => `/private/notifications/${id}/read`,
    MARK_ALL_READ: '/private/notifications/mark-all-read',
    DELETE: (id: string) => `/private/notifications/${id}`,
    DELETE_ALL_READ: '/private/notifications/delete-all-read',
  },
} as const;
