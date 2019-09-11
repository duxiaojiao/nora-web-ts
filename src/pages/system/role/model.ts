import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addRole, queryRole, queryRoleMenu, queryRolePage, removeRole, updateRole, updateRoleMenu} from './service';

import {RoleData} from './data.d';
import {ResponseType} from '@/services/common'
import {queryMenuSelectTree} from "@/pages/system/menu/service";

export interface StateType {
  data: RoleData;
  roleMenus: [];
  menuSelectTree: [];
}

export interface RoleListResponse extends ResponseType {
  data:{
    records:RoleData[]
    total:number
    size:number
    current:number
    searchCount:boolean
    pages:number
  }
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
    add: Effect;
    remove: Effect;
    update: Effect;
    queryRole: Effect;
    queryRoleMenu: Effect;
    updateRoleMenu: Effect;
    menuSelectTree: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveRoleMenu:Reducer<StateType>;
    saveMenuSelectTree:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'roleMgt',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    roleMenus:[],
    menuSelectTree:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response: RoleListResponse = yield call(queryRolePage, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRole, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRole, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    * queryRole({payload}, {call, put}) {
      return yield call(queryRole, payload);
    },
    * queryRoleMenu({payload}, {call, put}) {
      return yield call(queryRoleMenu, payload);
    },
    * updateRoleMenu({payload, callback}, {call, put}) {
      console.log('payload',payload);
      const response = yield call(updateRoleMenu, payload);
      if (callback) callback();
      return response;
    },
    * menuSelectTree({payload}, {call, put}) {
      const response: ResponseType = yield call(queryMenuSelectTree, payload);
      yield put({
        type: 'saveMenuSelectTree',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      const s1 = <StateType>state
      return {
        ...s1,
        data: {
          list: action.payload.records,
          pagination: {
            total: action.payload.total,
            pageSize: action.payload.size,
            current: action.payload.current,
          }
        },
      };
    },
    saveRoleMenu(state, action) {
      const s1 = <StateType>state;
      return {
        ...s1,
        roleMenus: action.payload,
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
