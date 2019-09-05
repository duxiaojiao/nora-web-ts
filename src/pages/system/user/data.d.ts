export interface UserItem {
  userId: number;
  userName: string;
  phone: string;
  email: string;
}

export interface UserPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserData {
  list: UserItem[];
  pagination: Partial<UserPagination>;
}

export interface UserParams {
  userName: string;
  phone: string;
  email: string;
  size: number;
  current: number;
}
