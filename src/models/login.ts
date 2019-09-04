import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setToken, removeAll } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  errorMessage: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // Login successfully
      if (response.access_token) {
        const { access_token, token_type } = response;
        yield yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            type: 'account',
            access_token: access_token,
            token_type: token_type,
          },
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield yield put(routerRedux.replace(redirect || '/'));
      } else if (response.error) {
        yield put({
          type: 'changeLoginStatus',
          payload: { status: 'error', errorMessage: response.error_description, type: 'account' },
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'logout',
          type: 'account',
        },
      });
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      //登录成功，保存token
      if (payload.status === 'ok') {
        //拿到token，保存到localStorage
        const token = `${payload.token_type} ${payload.access_token}`;
        setToken(token);
      }
      if (payload.status === 'logout') {
        //退出则清空token
        removeAll();
      }
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
