import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/system/user');
}

export async function queryCurrent(): Promise<any> {
  return request('/system/user/info');
}

export async function queryNotices(): Promise<any> {
  return request('/notices');
}
