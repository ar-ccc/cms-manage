import React, { useState, useEffect } from 'react'
import './less/List.less'
import { Space, Table, message, Button } from 'antd';
import { ArticleApi,ArticleDetailDeleteApi } from '../request/api'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';


export default function List() {
  // 数据列表
  const [data, setData] = useState([])
  // const [pageSize, setPageSeize] = useState(10)
  const [pagination, setPaginnation] = useState({
    hideOnSinglePage: true,
    onChange: (page, pageSize) => {
      console.log(page,pageSize);
      getArticleList(page, pageSize)
    },

  })
  const navigate = useNavigate();

  //页面加载后
  useEffect(() => {
    //默认第一页，10条数据
    getArticleList(1,10)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //请求文章列表
  const getArticleList = (page, pageSize) => {
    let arr = []
    ArticleApi({page,pageSize})
      .then(resp => {
        console.log(resp)
        
        
        if (resp.code === 200) {
          //变更分页信息
          pagination.total=resp.data.total
          pagination.current=resp.data.current
          pagination.pageSize=resp.data.pageSize
          setPaginnation(pagination)
          // setPaginnation(pagination) 
          resp.data.records.map(item =>
            arr.push({
              key: item.id,
              title: item.mainTitle,
              subTitle: item.subTitle,
              date: moment(item.date).format('YYYY-MM-DD')
            })
          )
          setData(arr)
        } else {
          message.error(resp.message)
        }

      })
      .catch(err => console.log('出现异常，', err))

  }

  const columns = [
    {
      dataIndex: 'title',
      key: 'title',
      width: '80%',
      render: (text, record) => <div>
        <h4>{text}</h4>
        <p style={{ color: '#999' }}>{record.subTitle}123</p>
      </div>
    },
    {
      dataIndex: 'date',
      key: 'date',
      width: '10%'
    },
    {
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' onClick={()=> navigate('/edit?id='+record.key)}>update</Button>
          <Button type='primary' onClick={()=> {
            ArticleDetailDeleteApi(record.key)
            // console.log(record.key);
          }} danger>delete</Button>
        </Space>
      ),
    },
  ];



  return (
    <div className="list" >
      <Table
        size='small'
        showHeader={false}
        columns={columns}
        dataSource={data}
        pagination={pagination}
      />
    </div>

  )
}
