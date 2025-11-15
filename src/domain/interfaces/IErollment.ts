import { EnrollmentStatus, IBaseEntity } from "./IEnum";
import { IUser } from "./IUser";

export interface IEnrollment extends IBaseEntity {
  student_id: string;
  class_id: string;
  enrolled_at: Date;
  status: EnrollmentStatus;
  dropped_at?: Date;
  completed_at?: Date;
}


export interface IStudentInfo {
  _id: string;
  user_id: IUser;
  student_code: string;
  avatar: string;
  grade_level: number;
  current_class: string;
  school_name: string;
  learning_style: string;
  difficulty_preference: string;
  last_active: string;
  created_at: string;
  updated_at: string;
}

export interface IEnrollmentItem {
  student_id: IStudentInfo;
  class_id: string;
  status: string;
  attendance_count: number;
  enrollment_date: string;
  created_at: string;
  updated_at: string;
  id: string;
}

export interface IEnrollmentResponse {
  success: boolean;
  message: string;
  data: IEnrollmentItem[];
}
