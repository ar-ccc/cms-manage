import request from './request'
//注册
export const RegitstryApi =(data)=> request.post('/user/registry',data)
//登录
export const LoginApi =(data)=> request.post('/user/login',data)