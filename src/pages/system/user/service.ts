import request from '@/utils/request';
import { UserParams } from './data.d';

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

export async function updateUser(params: UserParams) {
  return request('/system/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function removeUser(params: UserParams) {
  return request('/system/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
