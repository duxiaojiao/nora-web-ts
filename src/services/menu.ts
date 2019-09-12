import request from '@/utils/request';
import {MenuParams} from "@/pages/system/menu/data";


export async function getMenuData(params: MenuParams) {
  return request('/system/menu/userMenuTree', {
    method: 'GET',
  });
}
