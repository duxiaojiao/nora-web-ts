import request from '@/utils/request';
import {DepartmentItem} from './data.d';


export async function addDept(params: DepartmentItem) {
  return request('/hr/department', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}

export async function queryDeptTree() {
  return request('/hr/department/departmentTree', {
    method: 'GET',
  });
}
