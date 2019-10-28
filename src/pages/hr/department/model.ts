import {AnyAction, Reducer} from 'redux';
import {EffectsCommandMap} from 'dva';
import {addDept, queryDeptTree} from './service';
import {DepartmentItem} from './data.d';
import {ResponseType} from '@/services/common'

export interface StateType {
  // data: RoleData;
  departmentTree: [];
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
    // remove: Effect;
    // update: Effect;
    // menuSelectTree: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'deptMgt',

  state: {
    departmentTree:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response: ResponseType = yield call(queryDeptTree, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addDept, payload);
      yield put({ type: 'fetch' });
      if (callback) callback();
      return response;
    },
  },

  reducers: {
    save(state, action) {
      const s1 = <StateType>state;
      return {
        ...s1,
        departmentTree: action.payload,
      };
    },
  },
};

export default Model;
