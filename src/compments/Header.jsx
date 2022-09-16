import React from 'react'
import logoImg from '../assets/logo.png';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import { LogoutApi } from '../request/api';
import { removeToken } from '../shared/token';

export default function Header() {

    const name = sessionStorage.getItem('username')
    const navigate = useNavigate()
    const logout = () => {
        message.success('退出登录')
        LogoutApi()
        setTimeout(() => {
            navigate('/login')
        }, 1500);
        removeToken()
    }
    const edit = () => {
        navigate('means')
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <span onClick={edit} target="_blank" rel="noopener noreferrer" >
                            修改资料
                        </span>
                    ),
                },
                {
                    key: '2',
                    label: (

                        <sapn onClick={logout} target="_blank" rel="noopener noreferrer" >
                            退出登录
                        </sapn>
                    )
                }
            ]}
        />
    );
    return (
        <header>
            <img src={logoImg} alt="" className='logo' />
            <Dropdown overlay={menu} >
                <Space>
                    {name}
                    <CaretDownOutlined />
                </Space>
            </Dropdown>
        </header>
    )
}
