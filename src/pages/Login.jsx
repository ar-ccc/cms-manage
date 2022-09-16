import React,{useEffect} from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,message } from 'antd';
import { Link,useNavigate } from 'react-router-dom'
import './less/Login.less'
import logoImg from '../assets/logo.png'
import {IsLoginApi, LoginApi} from '../request/api'
import { setToken } from '../shared/token';


export default function Login() {
  const navigate = useNavigate()

  // 如果已经登录，跳转到list页面
  useEffect(()=>{
    IsLoginApi()
    .then((resp)=>{
        if(resp.code===200){
            navigate('/list')
        }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onFinish = (values) => {
    LoginApi(values)
    .then(resp=>{
      if(resp.code===200){
        message.success('登陆成功')
        //设置token
        setToken(resp.data['token'])
        sessionStorage.setItem("username",values.username)
        setTimeout(() => {
          navigate('/list')
        }, 2000);
      }else{
        console.log(resp);
        message.error(resp.message)
      }
    })
    .catch(err=>{
      console.log(err);
      message.error('网络出错...')
    })
  };

  return (
    <div className="login">
      <div className='login_box'>
        <img src={logoImg} alt='' />
        <Form
          size='large'
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Link to='/registry'>
              还没账号？立即注册
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
