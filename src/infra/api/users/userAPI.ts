import axiosInstance from "../conflig/axiosInstance";
import { API_ENDPOINTS } from "../conflig/apiEndpoints";
import { IUser ,IUserResponse} from "@/domain/interfaces/IUser";
class UserAPI {
  async getCurrentUser(): Promise<IUser> {
    const response = await axiosInstance.get<IUser>(API_ENDPOINTS.USERS.CURRENT_USER);
    return response.data;
  }
  async getAllUsers(params?: {
    limit?: number;
    offset?: number;
  }): Promise<IUserResponse> {
    const response = await axiosInstance.get<IUserResponse>(API_ENDPOINTS.USERS.LIST, {
      params: {
        limit: params?.limit || 10,
        offset: params?.offset || 0,
      },
    });
    return response.data;
  }

  async detailUser(userId: string): Promise<IUser> {
    const response = await axiosInstance.get<IUser>(API_ENDPOINTS.USERS.DETAIL(userId));
    return response.data;
  }

  async deleteUser(userId: string): Promise<void> {
    await axiosInstance.delete(API_ENDPOINTS.USERS.DELETE_USER(userId));
  }



}

export default new UserAPI();
