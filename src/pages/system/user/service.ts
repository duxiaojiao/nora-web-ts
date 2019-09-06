import request from '@/utils/request';
import {UserParams, UserItem} from './data.d';

export async function queryUser(params: UserParams) {
  return request('/system/user', {
    method: 'GET',
    params: params,
  });
}

export async function addUser(params: UserParams) {
  return request('/system/user', {
    method: 'POST',
    data: params,
  });
}

export async function updateUser(params: UserItem) {
  return request('/system/user/' + params.userId, {
    method: 'PUT',
    data: params,
  });
}

export async function removeUser(params: number) {
  return request('/system/user/' + params, {
    method: 'DELETE',
  });
}

export async function resetPwd(params: { id: number, password: string }) {
  return request('/system/user/password/' + params.id, {
    requestType: 'form',
    method: 'PUT',
    data: {password: params.password}
  });
}
