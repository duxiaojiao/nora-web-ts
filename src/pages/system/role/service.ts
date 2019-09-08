import request from '@/utils/request';
import {RoleParams, RoleItem} from './data.d';

export async function queryRole(params: RoleParams) {
  return request('/system/role/roles', {
    method: 'GET',
    // params: params,
  });
}

export async function queryRolePage(params: RoleParams) {
  return request('/system/role/pages', {
    method: 'GET',
    params: params,
  });
}

export async function addRole(params: RoleParams) {
  return request('/system/role', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}

export async function updateRole(params: RoleItem) {
  return request('/system/role/' + params.roleId, {
    method: 'PUT',
    data: params,
    requestType: 'form',
  });
}

export async function removeRole(params: number) {
  return request('/system/role/' + params, {
    method: 'DELETE',
  });
}

export async function queryRoleMenu(params: number) {
  return request('/system/role/'+params+'/menu', {
    method: 'GET',
  });
}

export async function updateRoleMenu(params: { id: number, menuIds: number[] }) {
  return request('/system/role/' + params + '/menus', {
    method: 'PUT',
    data: params.menuIds,
  });
}
