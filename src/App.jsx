import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import LeftMenu from './compments/LeftMenu'

import Header from './compments/Header'

const { Sider } = Layout;

export default function App() {
    return (
        <>
            <Layout>
                <div className="app">
                    {/* 头标签区 */}
                    <div className="header_box">
                        <Header />
                    </div>
                    {/* 中间区 */}
                    <div className="main_box">
                        <Layout>
                            <div className="menu">
                                <Sider><LeftMenu /></Sider>
                            </div>

                            <div className="main">
                                {/* <Content> */}
                                    <Outlet />
                                {/* </Content> */}
                            </div>
                        </Layout>

                    </div>
                    {/* 底标签区 */}
                    <div className="footer_box">
                        <footer>这是底边框</footer>
                    </div>
                </div>
            </Layout>
        </>
    )
}
