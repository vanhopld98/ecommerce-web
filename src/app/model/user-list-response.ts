import {UserResponse} from "./user-response";

export interface UserListResponse {
  page?: number,
  size?: number,
  totalPage?: number,
  userProfiles?: UserResponse[];
}
