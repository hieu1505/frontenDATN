import React, { useState,useEffect } from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useParams } from 'react-router-dom';
import activityApi from "../../api/activityApi";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import moment from "moment";
import commentApi from "../../api/commentApi";
import jwt from 'jwt-decode';


function ActivityDetail() {
    let { id } = useParams();
    const [listcomment,setlistcomment]=useState([])
    const [totalComment,settotalComment]=useState('')
    const  [totallike,settotallike]=useState('')
    const [activity,setactivity]=useState('')
    const [comment, setComment] = useState("");
    useEffect(() => {
        (async () => {
          try {
            const authenticated = localStorage.getItem('access_token')
    
            const data = await activityApi.getActivityByid(id, {
              headers: {
                Authorization: authenticated
              }
    
            })
            console.log(data)
            setactivity(data?.activity)
            const param={}
            const comments=await commentApi.getallcommentbyactivity(id,{
                params:param,
                headers: {
                Authorization: authenticated
            }})
            console.log(comments)
            setlistcomment(comments.Comment)
           settotalComment(comments.page.totalElements)  
            settotallike(data?.activity?.totalLikes)
          } catch (error) {
            console.log(error)
          }
        })()
      }, [])
   
    
    const sendcommen=async()=>{
       
        try {
           
            if(comment!=''){
                const authenticated = localStorage.getItem('access_token')
                const accountid = jwt(authenticated).id
                const param={idaccount:accountid,idactivity:id ,content:comment}
                console.log(param)
                const comments=await commentApi.postcomment(param,{
                   
                    headers: {
                    Authorization: authenticated
                }
                })
                console.log(comments)
                setComment('')
                setlistcomment(comments.listcomment)
             
            }
            else{
                return;
            }
          
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=" bg-white shadow-md rounded-md p-4  flex-1">
            <h1 className="text-4xl py-3"> Activity:</h1>
            <h1 className="bg-amber-100 text-3xl">{activity?.title}</h1>
      <div className="bg-amber-100 flex flex-col">
        <img
          alt="img"
          src={activity?.img}
          className="object-cover h-[300px] w-[100%]"
        />
        <p>{activity?.content}</p>
      </div>
      <div className="flex justify-around items-center  bg-amber-100">
        <div className="flex space-x-2">
        <FaThumbsUp className="text-2xl" color="red"/>
        <p className="text-gray-900 text-x">{totallike}</p>
        </div>
       <div className="flex space-x-2">
       <FaComment className="text-2xl" color="blue" />
        <p className="text-gray-900 text-x">{totalComment}</p>
       </div>
       
      </div>
            <div className="mt-4">
            <h1 className="text-2xl">Các bình luận: </h1>
            <div  className="flex space-x-2 me-2">
                <input
                    type="text"
                    className="border border-gray-300 rounded-md px-2 py-1 mt-2 w-full"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Add a comment..."
                />
                <button
                   onClick={() => {sendcommen()}}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 mt-2 rounded-md"
                >
                    Send
                </button>
            </div>
           
            {listcomment.reverse().map((comment, index) => (
          <div key={index} className="flex items-center space-x-2">
           
            <div>
              <div className="flex items-center space-x-4 bg-slate-200 ">
              <img
              src={comment.account.profile.avatar}
              alt="Avatar"
              className="h-8 w-8 rounded-full"
            />
                <p className="text-gray-700 text-xl">{comment.account.profile.name}</p>
                <p className="text-gray-500 text-sm p-end ">{ moment(comment.createdAt).fromNow()}</p>
              </div>
              <p className="text-gray-500 text-2xl">{comment.content}</p>
            </div>
          </div>
        ))}
            </div>
            <p>xem thêm</p>
        </div>
    );
}
export default ActivityDetail