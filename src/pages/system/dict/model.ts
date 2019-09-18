import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addDict, queryDict, updateDict, removeDict} from './service';

import {DictData} from './data.d';
import {ResponseType} from '@/services/common'

export interface StateType {
  data: DictData;
  DictMenus: [];
  menuSelectTree: [];
}

export interface DictListResponse extends ResponseType {
  data:{
    records:DictData[]
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
    // queryDict: Effect;
    // queryDictMenu: Effect;
    // updateDictMenu: Effect;
    // menuSelectTree: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    // saveDictMenu:Reducer<StateType>;
    // saveMenuSelectTree:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'dictMgt',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    DictMenus:[],
    menuSelectTree:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response: DictListResponse = yield call(queryDict, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDict, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDict, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateDict, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
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
    // saveDictMenu(state, action) {
    //   const s1 = <StateType>state;
    //   return {
    //     ...s1,
    //     DictMenus: action.payload,
    //   };
    // },
    // saveMenuSelectTree(state, action) {
    //   const s1 = <StateType>state
    //   return {
    //     ...s1,
    //     menuSelectTree: action.payload,
    //   };
    // },
  },
};

export default Model;
