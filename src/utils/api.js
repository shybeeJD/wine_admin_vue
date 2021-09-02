import http from '../utils/http'




export const login = data => http.post('/user/login', data);

export const logout = () => http.post('/user/logout');
