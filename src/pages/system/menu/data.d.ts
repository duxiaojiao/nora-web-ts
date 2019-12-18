export interface MenuItem {
  menuId: number;
  menuCode: string;
  menuName: string;
  parentId: number;
  router: string;
  icon: string;
  menuType: string;
  permission: string;
  url: string;
  method: string;
  sorter: string;
}

export interface MenuPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface MenuData {
  list: MenuItem[];
  pagination: Partial<MenuPagination>;
}

export interface MenuParams {
  menuCode: string;
  menuName: string;
  size: number;
  current: number;
}
