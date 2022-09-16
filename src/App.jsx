import React, { useEffect } from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import LeftMenu from './compments/LeftMenu'
import { IsLoginApi } from './request/api'
import Header from './compments/Header'

const { Sider } = Layout;

export default function App() {

    const navigate = useNavigate()

    //设置路由拦截
    useEffect(()=>{
        IsLoginApi()
        .then((resp)=>{
            if(resp.code!==200){
                navigate('/login')
            }else{
                navigate('/list')
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                            {/* 左侧菜单栏 */}
                            <div className="menu">
                                <Sider><LeftMenu /></Sider>
                            </div>
                            {/* 主要显示区域 */}
                            <div className="main">
                                <div className="main_content">
                                    <Outlet />
                                </div>
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
