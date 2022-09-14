import { SnippetsOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom'


export default function LeftMenu() {

    const navigate = useNavigate();

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('文章', 'list', <SnippetsOutlined />),
        getItem('编辑', 'edit', <EditOutlined />),
        getItem('修改资料', 'means', <FormOutlined />)
    ];
    const onClick = (e) => {
        console.log('click ', e);
        navigate(e.key)
    };


    return (
        <>
            <div className='menu'>
                <Menu
                    theme='dark'
                    onClick={onClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
        </>
    )
}


