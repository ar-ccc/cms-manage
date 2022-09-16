import request from './request'
//注册
export const RegitstryApi =(data)=> request.post('/user/registry',data)
//登录
export const LoginApi =(data)=> request.post('/user/login',data)
//文章列表
export const ArticleApi= (data)=> request.get('/article/list',{params:data})
//文章详情
export const ArticleDetailApi = (id)=>request.get('/articleDetial/get/'+id)
//修改或保存文章
export const ArticleDetailAddApi = (data) => request.post('/articleDetial/add',data)
//删除文章
export const ArticleDetailDeleteApi = (id) =>  request.delete('/articleDetial/delete/'+id)
//验证是否登录
export const IsLoginApi =()=> request.get('/user/isLogin')
//退出登录
export const LogoutApi = () => request.get('/user/logout')