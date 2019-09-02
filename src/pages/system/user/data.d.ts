export interface UserListItem {
  userId: number;
  userName: string;
  phone: string;
  email: string;
}

export interface UserListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserListData {
  list: UserListItem[];
  pagination: Partial<UserListPagination>;
}

export interface UserListParams {
  userName: string;
  phone: string;
  email: string;
  size: number;
  current: number;
}
