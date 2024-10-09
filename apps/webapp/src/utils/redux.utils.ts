import type { User, UsersListResponse } from "../types/users.interface";

export function isUserListResponse(draft: any): draft is UsersListResponse {
  return draft && draft.data !== undefined && Array.isArray(draft.data);
}

export function isUser(draft: any): draft is User {
  return draft && draft.id !== undefined && typeof draft.id === "number";
}
