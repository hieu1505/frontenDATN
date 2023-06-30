import React, { useState } from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useParams } from 'react-router-dom';
import activityApi from "../../api/activityApi";
import { data } from "autoprefixer";


const mdParser = new MarkdownIt(/* Markdown-it options */);



function Activity(){
  let { id } = useParams();
  console.log(id)
  const [title,settitle]=useState('')
  const[content,setcontent]=useState('')
  const[contentHTML,setcontentHTML]=useState('')
  const [fileInput, setFileInput] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [File,setFile]=useState()
  
  function handlechange(){
    
    (async () => {
      try {
        
        let data={
          image:File,
          title:title,
          content:content,
          contentHTML:contentHTML
        }
          const authenticated = localStorage.getItem('access_token')
         const activity= await activityApi.createActivity(id,data,{
              headers: {
                'Content-Type': 'multipart/form-data',
                  Authorization: authenticated
              }
          })
    console.log(activity)
      } catch (err) {
          console.log(err)
      }
  })()
    
  }
  function handleEditorChange({ html, text }) {
    setcontentHTML(html);
    setcontent(text)
  }
  
  console.log(File)
  const handleChangeImg = e => {
      const file = e.target.files[0]
      setFileInput(e.target.value)
      previewFile(file)
      setFile(file)
  }
  const previewFile = file => {
      if (!file)
          return
      const reader = new FileReader(file)
      reader.readAsDataURL(file)
      reader.onloadend = () => {
          setPreviewSource(reader.result)
      }
  }
    return (<div className="flex flex-1 flex-col">
       <h1 className="text-3xl">Create Activity</h1>
        <h1 className="text-3xl pt-4">Title</h1>
        <input onChange={(e)=>{settitle(e.target.value)}} className='text-2xl block w-full bg-sky-500/75 mt-1 border-red-200 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'/>
        <h1 className="text-3xl pt-4">image</h1>
        <div className="w-50 h-50 px-4 flex justify-center flex-col">
          <div className="relative">
              {previewSource && <img alt="img" src={previewSource} className="h-50 w-50  " />}
              {!previewSource  && <img alt="img" src="https://via.placeholder.com/300" className="h-50 w-50  " />}
          </div>
          <div>
              <label
                  className="chooseImg__label"
                  htmlFor="chooseImg"
              >
                  Chọn ảnh
              </label>
              <input
                  id="chooseImg"
                  type="file"
                  onChange={handleChangeImg}
                  value={fileInput}
                  className="inputFile"
              />
          </div>

      </div>
        <h1 className="text-3xl">Content</h1>
        <MdEditor className="w-full pt-3 h-96" renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
        <button onClick={handlechange} className="rounded-md p-3 mt-3 w-20 text-2xl bg-amber-200">Save</button>
    </div>
      );
}
export default Activity
function PreviewUploadImg({ form, name }) {
  const [fileInput, setFileInput] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const handleChangeImg = e => {
      const file = e.target.files[0]
      if (file) form.setValue(name, file)
      setFileInput(e.target.value)
      previewFile(file)
  }
  const previewFile = file => {
      if (!file)
          return
      const reader = new FileReader(file)
      reader.readAsDataURL(file)
      reader.onloadend = () => {
          setPreviewSource(reader.result)
      }
  }

  return (
      <div className="w-100 px-4 flex justify-center flex-col">
          <div className="relative">
              {previewSource && <img alt="img" src={previewSource} className="bg-cover bg-center  " />}
              {!previewSource && form.getValues('image') !== '' && <img alt="img" src={form.getValues('image')} className="h-10 w-10   " />}
              {!previewSource && form.getValues('image') === '' && <img alt="img" src="https://via.placeholder.com/300" className="h-10 w-10   " />}
          </div>
          <div>
              <label
                  className="chooseImg__label"
                  htmlFor="chooseImg"
              >
                  Chọn ảnh
              </label>
              <input
                  id="chooseImg"
                  type="file"
                  onChange={handleChangeImg}
                  value={fileInput}
                  className="inputFile"
              />
          </div>

      </div>
  )
}