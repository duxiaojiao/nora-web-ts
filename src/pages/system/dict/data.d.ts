export interface DictItem {
  id: number;
  dictCode: string;
  dictName: string;
  descr: string;
}

export interface DictPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface DictData {
  list: DictItem[];
  pagination: Partial<DictPagination>;
}

export interface DictParams {
  dictCodeOrName: string;
  size: number;
  current: number;
}
