import request from './request'

export const RegitstryApi =(data)=> request.post('/registry',data)