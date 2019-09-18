export interface DictItem {
  id: number;
  dictCode: string;
  dictName: string;
  descr: string;
}

export interface DictDetail {
  id: number;
  dictId: number;
  itemValue: string;
  itemText: string;
  descr: string;
  sorter: number;
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

export interface DictDetailParams {
  dictId: number;
  itemValueOrText: string;
}
