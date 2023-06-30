import SidebarCenter from '../../components/Sidebar/Contents/SidebarCenter';
import ContentRight from '../../components/Sidebar/Contents/ContentRight';
import { Outlet } from "react-router-dom";

function HomeCenter() {
    return (
      <div className="w-full min-h-screen bg-white flex flex-row">
        <SidebarCenter/>
        {/* <ContentLeft/> */}
        <Outlet/>
        <ContentRight/>

      </div>
    )
}
export default HomeCenter