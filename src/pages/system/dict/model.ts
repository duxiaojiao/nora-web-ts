import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  addDict,
  queryDict,
  updateDict,
  removeDict,
  addDictItem,
  updateDictItem,
  removeDictItem,
  queryDictItem,
} from './service';
import { DictData, DictDetail } from './data.d';
import { ResponseType } from '@/services/common';

export interface StateType {
  data: DictData;
  dictDetail: DictDetail[];
}

export interface DictListResponse extends ResponseType {
  data: {
    records: DictData[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

export interface DictItemListResponse extends ResponseType {
  data: DictDetail[];
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
    fetchDetail: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
    addDictItem: Effect;
    updateDictItem: Effect;
    removeDictItem: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    saveDictDetail: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'dictMgt',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    dictDetail: [],
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
      if (callback) callback(response);
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
      if (callback) callback(response);
      return response;
    },
    *fetchDetail({ payload }, { call, put }) {
      const response: DictItemListResponse = yield call(queryDictItem, payload);
      yield put({
        type: 'saveDictDetail',
        payload: response.data,
      });
    },
    *addDictItem({ payload, callback }, { call, put }) {
      const response = yield call(addDictItem, payload);
      // yield put({type: 'fetchDetail'});
      if (callback) callback();
      return response;
    },
    *updateDictItem({ payload, callback }, { call, put }) {
      const response = yield call(updateDictItem, payload);
      // yield put({type: 'fetchDetail'});
      if (callback) callback();
      return response;
    },
    *removeDictItem({ payload, callback }, { call, put }) {
      const response = yield call(removeDictItem, payload);
      // yield put({type: 'fetchDetail'});
      if (callback) callback();
      return response;
    },
  },

  reducers: {
    save(state, action) {
      const s1 = <StateType>state;
      return {
        ...s1,
        data: {
          list: action.payload.records,
          pagination: {
            total: action.payload.total,
            pageSize: action.payload.size,
            current: action.payload.current,
          },
        },
      };
    },
    saveDictDetail(state, action) {
      const s1 = <StateType>state;
      return {
        ...s1,
        dictDetail: action.payload,
      };
    },
  },
};

export default Model;
