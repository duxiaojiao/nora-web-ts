import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addUser, queryUser,queryRole, removeUser, updateUser,resetPwd } from './service';

import { UserData } from './data.d';
import {ResponseType} from '@/services/common'

export interface StateType {
  data: UserData;
}

export interface UserListResponse extends ResponseType {
  data:{
    records:UserData[]
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
    queryRole: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userMgt',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response: UserListResponse = yield call(queryUser, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    * queryRole({payload}, {call, put}) {
      return yield call(queryRole, payload);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUser, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *reset({ payload, callback }, { call, put }) {
      const response = yield call(resetPwd, payload);
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
