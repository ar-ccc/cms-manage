import React, { useEffect, useState } from 'react'
import { PageHeader, Input, Button } from 'antd'
import './less/Edit.less'
import { useSearchParams } from 'react-router-dom'
import { ArticleDetailApi, ArticleDetailAddApi } from '../request/api'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
// import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

export default function Edit() {
  const [params] = useSearchParams();
  const [mainTitle, setMainTitle] = useState('标题');
  const [subTitle, setSubTitle] = useState('副标题')
  const [editor, setEditor] = useState(null)
  const [id, setId] = useState(null)
  const [html, setHtml] = useState('<p>hello</p>')

  useEffect(() => {
    const id = params.getAll('id')[0]
    if (id != null) {
      console.log(id);
      ArticleDetailApi(id)
        .then(resp => {
          console.log(resp);
          setId(resp.data.id)
          setMainTitle(resp.data.mainTitle)
          setSubTitle(resp.data.subTitle)
          setHtml(resp.data.description != null ? resp.data.description : '<p>hello</p>')
        })
        .catch(err => {
          console.log('出现异常了', err);
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //销毁
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  const submitOrUpdate = () => {
    ArticleDetailAddApi({
      id, subTitle, mainTitle,
      description: editor.getHtml()
    })
  }
  const toolbarConfig = {}

  const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
  }


  return (
    <div className="edit_box">
      {/* 头区域 */}
      <div className="edit_header">
        <div className="edit_title">
          <PageHeader
            className="site-page-header"

            title={mainTitle}
            subTitle={subTitle}
          />
          <Button type='primary' onClick={submitOrUpdate}>{id == null ? '保存' : '修改'}</Button>
        </div>
        <div className="edit_setTitle">
          <Input showCount maxLength={20} onChange={e => setMainTitle(e.currentTarget.value)} value={mainTitle} />
          <br />
          <Input showCount maxLength={50} onChange={e => setSubTitle(e.currentTarget.value)} value={subTitle} />
        </div>

      </div>

      {/* 文本内容区 */}
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '300px', overflowY: 'hidden' }}
        />
      </div>
      {/* <div style={{ marginTop: '15px' }}>
        {html}
      </div> */}
    </div>
  )
}
