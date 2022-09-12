import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,message } from 'antd';
import {  Link,useNavigate } from 'react-router-dom'
import './less/Login.less'
import logoImg from '../assets/logo.png'
import {RegitstryApi} from '../request/api'


export default function Registry() {

  const navigate = useNavigate();

  const onFinish = ({username,password}) => {
    RegitstryApi({username,password})
    .then(rep =>{
      if(rep.code === 200){
        message.success('注册成功！跳转登录...')
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }else{
        message.error(rep.message)
      }
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
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次确认密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('两次密码不一致'));
                },
              }),
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="确认密码" />
          </Form.Item>
          <Form.Item>
            <Link to='/login'>
              有账号？去登录
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>立即注册</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
