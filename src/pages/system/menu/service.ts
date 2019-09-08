import request from '@/utils/request';
import {MenuParams, MenuItem} from './data.d';

export async function queryMenuTree(params: MenuParams) {
  return request('/system/menu/menuTree', {
    method: 'GET',
  });
}

export async function queryMenuSelectTree(params: MenuParams) {
  return request('/system/menu/selectMenuTree', {
    method: 'GET',
  });
}

export async function addMenu(params: MenuItem) {
  return request('/system/menu', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}

export async function updateMenu(params: MenuItem) {
  return request('/system/menu/' + params.menuId, {
    method: 'PUT',
    data: params,
    requestType: 'form',
  });
}

export async function removeMenu(params: number) {
  return request('/system/menu/' + params, {
    method: 'DELETE',
  });
}
