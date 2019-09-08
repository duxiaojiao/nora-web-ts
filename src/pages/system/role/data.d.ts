export interface RoleItem {
  roleId: number;
  roleCode: string;
  roleDescr: string;
  roleName: string;
}

export interface RolePagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface RoleData {
  list: RoleItem[];
  pagination: Partial<RolePagination>;
}

export interface RoleParams {
  roleCode: string;
  roleDescr: string;
  roleName: string;
  size: number;
  current: number;
}
