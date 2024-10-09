import { UserProfile } from "./users-profile.interface";

export interface CreateUserDto {
  email: string;
  first_name: string;
  last_name: string;

  profile: UserProfile;
}

export interface User extends CreateUserDto {
  id: number;

  createdAt: string;
  updatedAt: string;
}

export interface UsersListResponse {
  data: User[];
  total: number;
}
