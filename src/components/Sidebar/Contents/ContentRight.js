import React, { useEffect, useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { GrNotification } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';
import accountApi from "../../../api/accountApi";
import notificationApi from "../../../api/notificationApi";
export default function ContentRight() {

  const [account, setaccount] = useState([])
  const [noti, setnoti] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const authenticated = localStorage.getItem('access_token')
        const accountid = jwt(authenticated).id

        const data = await accountApi.getaccountById(accountid, {
          headers: {
            Authorization: authenticated
          }

        })
        const respone = await notificationApi.getNotification(accountid,
          {
            headers: {
              Authorization: authenticated
            }
          }
        )

        // console.log(respone.message)
        setnoti(respone.message)

        setaccount(data.account)
        localStorage.setItem('acount', data.account)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  console.log(noti)
  const imgRef = useRef();
  const Notiref = useRef()
  const bablelref = useRef()
  const menuRef = useRef();
  window.addEventListener('click', (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setopen(false);
    }
   

  })
  console.log("Type of noti:",  noti.length);
  const navigate = useNavigate()
  const [open, setopen] = useState(false)
  const [opennoti, setopennoti] = useState(false)
  const Menus = [{ title: 'Profile', path: 'profileinfo' }, { title: 'change password', path: 'changepassword' }, { title: 'logout', path: 'profileinfo' }]
  const changeStatus=async (id,activity_id) => {

    try {
        console.log('change')
        const authenticated = localStorage.getItem('access_token')
        const accountid = jwt(authenticated).id
        const mess = await notificationApi.changeStatus(id,
            {
                headers: {
                    Authorization: authenticated
                }
            }
        )
        console.log(mess)
        const respone = await notificationApi.getNotification(accountid,
          {
            headers: {
              Authorization: authenticated
            }
          }
        )

        // console.log(respone.message)
        setnoti(respone.message)
        // navigation.navigate('ActivityByid',{id:activity_id})
        //xem activitybi
    }
    catch (err) {
        console.log(err)
    }
}
  return (
    <section className="w-80  rounded-tl-70px overflow-hidden px-5">
      <div className="pt-1 flex justify-start space-x-20 items-center">
        <GrNotification size='1.2rem'
          ref={bablelref}
          onClick={() => {
            // navigate('profileinfo')
            setopennoti(!opennoti)
          }}
        />


        <img
          ref={imgRef}
          src={account?.profile?.avatar}
          alt="user"
          className="h-9 w-9 object-cover rounded-full"
          onClick={() => {
            // navigate('profileinfo')
            setopen(!open)
          }}
        />
      </div>
      {opennoti && <div ref={Notiref} className="bg-blue-300  w-55 me-300 sahdow=lg absolute right-16">
        <header className=" bg-blue-400">Thông báo</header>
        <ul>

          {noti.length!=0?noti.slice(0, 7).map((e) => (
            <li
              onClick={() => { 

                changeStatus( e.id,e.activity_id)
              }}
              className={e.status==1?"truncate cursor-pointer hover:bg-yellow-200":"truncate cursor-pointer hover:bg-yellow-200 bg-white"}
              style={{ maxWidth: "400px" }}
            >
              {e.message}
            </li>
          )):<li
          onClick={() => {           }}
          className="truncate cursor-pointer hover:bg-yellow-200"
          style={{ maxWidth: "400px" }}
        >
        no notice 
        </li>}
        </ul>
      </div>}
      {open && <div ref={menuRef} className="bg-white  w-45 me-300 sahdow=lg absolute ">
        <ul>
          {
            Menus.map((menu, index) => (
              <li onClick={() => {
                if (menu.title === 'logout') {
                  localStorage.removeItem("access_token");
                  navigate('/login')
                }
                else { navigate(menu.path) }
              }} className="p-2 text-clip cursor-pointer hover:bg-yellow-200" key={index}>{menu.title}</li>
            ))
          }
        </ul>
      </div>}
    </section>
  );
}