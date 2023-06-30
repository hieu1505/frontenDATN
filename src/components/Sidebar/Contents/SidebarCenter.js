import React, { useState ,useEffect} from "react";
import Logo from '../../../assets/logo.png'
import {
  BiHomeAlt,
  BiSolidUserPin,
  BiCreditCardAlt,
  BiUser,
  BiCalculator,
  BiBarChartAlt,
  BiFolderOpen
} from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import centerApi from "../../../api/centerApi";
import jwt from "jwt-decode";
function SidebarCenter() {

    const [center,setcemter]=useState([])
    useEffect(() => {
        (async () => {
          try {
            const authenticated = localStorage.getItem('access_token')
            const accountid = jwt(authenticated).id
            console.log(jwt(authenticated))
            
            const data=await centerApi.getcenterByacountid(accountid,{
              headers: {
                Authorization: authenticated
            }
            
            })
            console.log(data.message.id
                )
           setcemter(data.message)
          
          } catch (error) {
            console.log(error)
          }
        })()
      },[])
  const menu = [
    { name: "Home", icon: <BiHomeAlt />,path:'' },
    { name: "Center", icon: <BiCreditCardAlt />,path:`updateCenter/`+center.id },
    { name: "Children", icon: <BiUser />,path:'listChildren/'+center.id },
    { name: "Activity", icon: <BiCalculator />,path:'listActivity/'+center.id },
    { name: "Donor", icon: <BiBarChartAlt />,path:'revenueManagement/'+center.id },
    { name: "Adrop_request", icon: <FaClipboardList />,path:'ListAdrop_request/'+center.id },

    // { name: "Settings", icon: <RiSettings5Line />,path:'' },
  ];
  const navigate=useNavigate()
  

const notActiveStyle='flex flex-row items-center text-gray-500';
const activeStyle='flex flex-row items-center text-gray-1200'
  const schedulePayments = ["Monthly Rent", "Food Payment", "Utility Bills"];
  return (
    <div className="h-screen border-r border-gray-200 w-64  px-9 space-y-10">
      <div className="flex flex-row items-center pt-8 text-[20px]"  onClick={()=>navigate('/')}>
        <img src={Logo} alt="sakir" className="w-9 h-9" />
        <div>{center.name} </div>
      </div>
      <div className="space-y-24">
        <div>
          <div className="mb-4 text-indigo-700 text-[20px] " >Menu </div>
          <div className="flex flex-col space-y-7">
          {menu.map((val, index) => {return (<NavLink to={val.path} 
          key={val.path}
          end={val.end}
          className={({isActive})=>isActive?activeStyle:notActiveStyle}>
            {val.icon}
            <span>{val.name}</span>
          </NavLink>)})}
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default SidebarCenter;
