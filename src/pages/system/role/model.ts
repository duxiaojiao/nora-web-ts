import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addRole, queryRole,queryRolePage, removeRole, updateRole,} from './service';

import { RoleData } from './data.d';
import {ResponseType} from '@/services/common'

export interface StateType {
  data: RoleData;
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
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'roleMgt',

  state: {
    data: {
      list: [],
      pagination: {},
    },
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
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
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
  },
};

export default Model;
