import request from '@/utils/request';
import { UserParams } from './data.d';

export async function queryUser(params: UserParams) {
  return request('/system/user', {
    method: 'GET',
    params: params,
  });
}

export async function removeUser(params: UserParams) {
  return request('/system/User', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params: UserParams) {
  return request('/system/User', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: UserParams) {
  return request('/system/User', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
