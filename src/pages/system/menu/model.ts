import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {addMenu, queryMenuTree, queryMenuSelectTree, removeMenu, updateMenu,} from './service';

import { MenuData } from './data.d';
import {ResponseType, SelectTree} from '@/services/common'
import { TreeNodeNormal } from 'antd/lib/tree-select/interface';

export interface StateType {
  data: MenuData;
  menuSelectTree?: MenuSelectTree
}

export interface MenuListResponse extends ResponseType {
  data:{
    data:MenuData[]
  }
}

export interface MenuSelectTree extends TreeNodeNormal{
  title: string
  value: number
  key: string
  children: MenuSelectTree[]
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    menuSelectTree: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveMenuSelectTree: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'menuMgt',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response: MenuListResponse = yield call(queryMenuTree, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    * menuSelectTree({payload}, {call, put}) {
      const response: ResponseType = yield call(queryMenuSelectTree, payload);
      yield put({
        type: 'saveMenuSelectTree',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addMenu, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeMenu, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateMenu, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: {
          list: action.payload,
          pagination: {},
        },
      };
    },
    saveMenuSelectTree(state, action) {
      const s1 = <StateType>state
      return {
        ...s1,
        menuSelectTree: action.payload,
      };
    },
  },
};

export default Model;
