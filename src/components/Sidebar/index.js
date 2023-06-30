import React from "react";
import Logo from "../../assets/logo.png";
import {
  BiHomeAlt,
  BiGridAlt,
  BiCreditCardAlt,
  BiUser,
  BiCalculator,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const menu = [
    { name: "Home", icon: <BiHomeAlt />,path:'listAccount' },
    { name: "Account", icon: <BiGridAlt />,path:'listAccount' },
    { name: "Center", icon: <BiCreditCardAlt />,path:'listCenter' },
    { name: "Contacts", icon: <BiUser />,path:'afsaf' },
    { name: "Loan Calculator", icon: <BiCalculator />,path:'asfas' },
    // { name: "Settings", icon: <RiSettings5Line />,path:'' },
  ];
  const navigate=useNavigate()
  

const notActiveStyle='flex flex-row items-center text-gray-500';
const activeStyle='flex flex-row items-center text-gray-1200'
  
  return (
    <div className="h-screen border-r border-gray-200 w-64  px-9 space-y-10">
      <div className="flex flex-row items-center pt-8 text-[20px]"  onClick={()=>navigate('/')}>
        <img src={Logo} alt="sakir" className="w-9 h-9" />
        <div>Quản lý trại trẻ mồ côi </div>
      </div>
      <div className="space-y-24">
        <div>
          <div className="mb-4 text-indigo-700 text-[20px] " >Menu </div>
          <div className="flex flex-col space-y-7">
          {menu.map((val, index) => {return (<NavLink to={val.path} key={index}
         
          end={val.end}
          className={({isActive})=>isActive?activeStyle:notActiveStyle}>
            {val.icon}
            <span>{val.name}</span>
          </NavLink>)})}
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default Sidebar;
