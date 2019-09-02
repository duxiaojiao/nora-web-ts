import request from 'umi-request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/oauth/token', {
    method: 'POST',
    params: {
      ...params,
      grant_type: 'password',
      scope: 'all',
    },
    headers: {
      Authorization: 'Basic Y2xpZW50XzI6MTIzNDU2',
    },
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
