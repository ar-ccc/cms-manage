import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LeftMenu from './compments/LeftMenu'

import Header from './compments/Header'

const { Sider, Content } = Layout;

export default function App() {
    return (
        <>
            <Layout className='app'>
                <Header/>
                <Layout>
                    <Sider><LeftMenu/></Sider>
                    <Content>
                        <div>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
                <footer>这是底边框</footer>
            </Layout>

        </>
    )
}
