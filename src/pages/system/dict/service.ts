import request from '@/utils/request';
import {DictData, DictItem,DictParams} from './data.d';

export async function addDict(params: DictItem) {
  return request('/system/dict', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}

export async function queryDict(params: DictParams) {
  return request('/system/dict', {
    method: 'GET',
  });
}

export async function updateDict(params: DictItem) {
  return request('/system/dict/' + params.id, {
    method: 'PUT',
    data: params,
    requestType: 'form',
  });
}

export async function removeDict(params: number) {
  return request('/system/dict/' + params, {
    method: 'DELETE',
  });
}
