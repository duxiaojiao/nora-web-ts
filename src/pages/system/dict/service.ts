import request from '@/utils/request';
import {DictItem, DictParams, DictDetail, DictDetailParams} from './data.d';

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

export async function addDictItem(params: DictDetail) {
  return request('/system/dict/item', {
    method: 'POST',
    data: params,
    requestType: 'form',
  });
}

export async function updateDictItem(params: DictDetail) {
  return request('/system/dict/item/' + params.id, {
    method: 'PUT',
    data: params,
    requestType: 'form',
  });
}

export async function removeDictItem(params: number) {
  return request('/system/dict/item/' + params, {
    method: 'DELETE',
  });
}

export async function queryDictItem(params: DictDetailParams) {
  return request('/system/dict/item', {
    method: 'GET',
    params: params,
  });
}


