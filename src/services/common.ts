export interface ResponseType {
  code: number;
  msg?: string;
  data?: any;
}

export interface Dictionary {
  label: string;
  value: number;
}

export interface SelectTree {
  title: string;
  value: number;
  key: number;
  children: SelectTree[],
}
