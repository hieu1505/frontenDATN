import React, { useState,useMemo,useEffect,useRef } from "react";

import { useParams } from 'react-router-dom';

import queryString from 'query-string'
import { useNavigate,useLocation } from "react-router-dom";
import "react-swipeable-list/dist/styles.css";
import Pagination from "../components/Sidebar/Pagination";

import AdropApi from "../api/AdropApi";

function AdropDetail(){
  let { id } = useParams();
  const navigate = useNavigate()
  const [listproof,setlistproof]=useState([])
  const [adropdetail,setadropdetail]=useState('');
  const [Marital_status,setMarital_status]=useState('')
    const [family_status,setfamily_status]=useState('')
    const[adropt_requestid,setadropt_requestid]=useState('')
    const [Request,setrequest]=useState('')

  const dataMarital_status = [
    { label: 'Độc thân', value: '1' },
    { label: 'Ly hôn', value: '2' },
    { label: 'Đã kết hôn', value: '3' },
    { label: 'Vợ hoặc chồng đã chết', value: '4' },

];
const data2family_status = [
    { label: 'sống có cùng bố mẹ', value: '1' },
    { label: 'Sống một mình', value: '2' },
    { label: 'Sống có cùng con cái', value: '3' },


];
  useEffect(() => {
    (async () => {
      try {
       
        const authenticated = localStorage.getItem('access_token')
        const request=await AdropApi.getadroprequestbyid(id, {
          
          headers: {
            Authorization: authenticated
          }

        })
        console.log(request)
        setrequest(request?.Adropt_request?.request)
        setadropt_requestid(request?.Adropt_request.id)
        const data = await AdropApi.getadropdetail(request?.Adropt_request?.adropt_detail_id
          , {
          
          headers: {
            Authorization: authenticated
          }

        })
        
        const lists=await AdropApi.getlistProof(request?.Adropt_request?.adropt_detail_id
          ,{
            headers: {
                
                Authorization: authenticated
            }
        })
        console.log(data)
        setlistproof(lists?.proofs)
        setadropdetail(data.Adropt_detail)
       
            for(let i=0;i<dataMarital_status.length;i++){
              if(dataMarital_status[i].value==data.Adropt_detail.marital_status){
                setMarital_status(dataMarital_status[i].label)
              }

            }
            for(let i=0;i<data2family_status.length;i++){
              if(data2family_status[i].value==data.Adropt_detail.family_status){
                setfamily_status(data2family_status[i].label)
              }

            }
        
      } catch (err) {
        alert(err)
      }
    })()
  }, [])
  const verifyrequest = () => {
    (async () => {
        try {
            const authenticated = localStorage.getItem('access_token')

            const s=await AdropApi.updatadroprequest(adropt_requestid,{
              request:'Accept'
            },{
              headers: {
                Authorization: authenticated
            }
            })
             navigate(-1)
        } catch (err) {
            console.log(err)
        }
    })()
}
const cancelrequest = () => {
  (async () => {
      try {
          const authenticated = localStorage.getItem('access_token')
         

          const s=await AdropApi.updatadroprequest(adropt_requestid,{
            request:'Unaccept'
          },{
            headers: {
              Authorization: authenticated
          }
          })
           navigate(-1)
      } catch (err) {
          console.log(err)
      }
  })()
}
    return (
        <div className={" bg-white shadow-md rounded-md flex-1"}>
           <div className="text-center ">
           <div className="mx-auto  rounded-full w-60 h-60  overflow-hidden mt-10 md:h-30 md:w-30">
              <img src={adropdetail?.account?.profile.avatar}   />
            </div>
           { Request=='NEW'&&<div className=" space-x-[200px] ">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => {verifyrequest() }}>verify request </button>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {cancelrequest() }}>cancel request</button>
    </div>}
           <h2 className="text-2xl  text-teal-600 font-medium dark:text-teal-400 md:text-2xl">
           {adropdetail?.account?.profile.name}
            </h2>
            <h3 className="text-xl  dark:text-white md:text-xl">
           Address: {adropdetail?.account?.profile.address}
            </h3>
            <h3 className="text-md py-1 dark:text-white md:text-md">
             phoneNumber:{adropdetail?.account?.profile.phoneNumber}
            </h3>
            <p className="text-md py-1 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
            Marital_status: {Marital_status}
            </p>
            <p className="text-md py-1 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
            Income: {adropdetail?.income}
            </p>
            <p className="text-md py-1 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
            family_status: {family_status}
            </p>
            <p className="text-md py-1 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
            image proof:
            </p>
           </div>
           <div className="grid grid-cols-5 gap-4 pt-10">
      {listproof.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl?.Link} alt={`Image ${index + 1}`} className="w-full h-auto" />
        </div>
      ))}
    </div>
        </div>)
}
export default AdropDetail