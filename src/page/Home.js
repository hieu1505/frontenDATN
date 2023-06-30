import Sidebar from '../components/Sidebar'
import ContentRight from '../components/Sidebar/Contents/ContentRight';
import { Outlet } from "react-router-dom";
import ContentLeft from '../components/Sidebar/Contents/ContentLeft'
function Home() {
    return (
      <div className="w-full min-h-screen bg-white flex flex-row">
        <Sidebar/>
        {/* <ContentLeft/> */}
        <Outlet/>
        <ContentRight/>

      </div>
    )
}
export default Home