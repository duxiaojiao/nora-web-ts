import { getMenuData } from '@/services/menu'; // 通过后台返回特定的数组json或者mock模拟数据
import { Reducer } from 'redux';
import { Effect } from './connect';
import {StateType} from "@/pages/system/role/model";

export interface MenuModelState {
  menuData: any[];
  selectedKeys:[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    getMenuData: Effect;
    selectKey: Effect;
  };
  reducers: {
    save: Reducer<MenuModelState>;
    saveKeys: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    menuData: [],
    selectedKeys:[],
  },
  effects: {
    *getMenuData({ payload, callback }, { call, put }) {
      const response = yield call(getMenuData);
      yield put({
        type: 'save',
        payload: response.data,
      });
      if (callback) callback(response);
    },
    *selectKey({ payload, callback }, { call, put }) {
      yield put({
        type: 'saveKeys',
        payload: payload.selectedKeys,
      });
    },
  },

  reducers: {
    save(state, action) {
      const s1 = <MenuModelState>state;
      return {
        ...s1,
        menuData: action.payload || [],
      };
    },
    saveKeys(state, action) {
      const s1 = <MenuModelState>state;
      return {
        ...s1,
        selectedKeys: action.payload || [],
      };
    },
  },
};
export default MenuModel;
