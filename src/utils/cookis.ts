import cookie from 'js-cookie';

export const setCookie = (key: string, value: string) => cookie.set(key, value);

export const getCookie: (key: string) => string = (key) => cookie.get(key) || '';

export const removeCookie = (key: string) => cookie.remove(key);
