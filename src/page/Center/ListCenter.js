
import React, { useState,useMemo,useEffect ,useRef} from "react";

import {
  BiSearch,
} from "react-icons/bi";
import { AiOutlineDelete,AiFillEdit } from "react-icons/ai";
import queryString from 'query-string'
import { useNavigate,useLocation } from "react-router-dom";
import "react-swipeable-list/dist/styles.css";
import Pagination from "../../components/Sidebar/Pagination";
import centerApi from "../../api/centerApi";

function ListCenter() {
  const location = useLocation()
  const [dataListcenter, setdataListcenter] = useState([])
  const [searchValue, setSearchValue] = useState(
    () => queryString.parse(location.search).key
)
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({
    totalPages: 3,
    totalElements: 11,
    page: 0
})
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search)
    return {
        page: Number.parseInt(params.page) || 0,
        limit: Number.parseInt(params.limit) || 10,
        key: params.key || ''
    }
}, [location.search])
const handlePageChange = page => {
  const filters = { ...queryParams, page: page }
  setPagination({...pagination,page:page})
  navigate(`?${queryString.stringify(filters)}`)
}
  const hanleSearch=e=>{
    setSearchValue(e.target.value)
  }
  const debounceValue = useDebounce(searchValue, 500)
  useEffect(() => {
    const params = { ...queryParams, key: debounceValue, page: 0 }
    navigate(`?${queryString.stringify(params)}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [debounceValue])
  useEffect(() => {
    (async () => {
        try {
            queryParams.key=searchValue
            console.log(queryParams)
            const authenticated = localStorage.getItem('access_token')
           
            const data = await centerApi.getallcenter({
              params:queryParams,
              headers: {
                Authorization: authenticated
            }
            
            })
            console.log(data)
            setdataListcenter(data.center)
            setPagination(data.page)
            // setIsLoading(false)
            console.log(queryParams)
        } catch (err) {
            alert(err)
        }
    })()
}, [queryParams,searchValue])
const handledelete=async(id)=>{
  try { 
    const authenticated = localStorage.getItem('access_token')
  
    const data=await centerApi.deleteCenter(id,{
      headers: {
        Authorization: authenticated
    }
    })
    const listcenter = await centerApi.getallcenter({
    
      headers: {
        Authorization: authenticated
    }
    
    })
    setdataListcenter(listcenter)
       
  } catch (error) {
    console.log(error)
  }
  }
console.log(dataListcenter)
  return (<>
    <div className="content-left px-2 flex-1 pt-1 h-screen overflow-y-scroll ">
      <h1 className="text-4xl">List Center</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded flex-grow" onClick={() => {navigate('/admin/createCenter/') }}>Create Center</button>
      
      <div className="border border-gray-300 rounded-lg w-full flex items-center py-3 px-3 ">
        <BiSearch className="mr-2" />
        <input type={"text"} className="flex-1 p-2 " placeholder="Search"onChange={e=>hanleSearch(e)} />
      </div>
      <div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        email
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        phoneNumber
                      </th>
                      
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th scope="col" className="relative px-5 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {dataListcenter &&
                                dataListcenter.map(center => (
                                  <tr key={center.id}>
                                       <td>{`${center.name} `}</td>
                                       <td>{`${center.email} `}</td>
                                       <td>{`${center.adress} `}</td>
                                       <td>{`${center.phoneNumber} `}</td>
                                      <td className="flex flex-row">
                                        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-2 rounded" >edit</button>  */}
                                      
                                        <AiFillEdit  size='2rem' color="blue" className="mx-2" onClick={()=>navigate("/admin/updateCenter/"+center.id)}/>
                                        <AiOutlineDelete size='2rem' color="red" onClick={()=>{handledelete(center.id)}}/>
                                     
                                     </td>
                                  </tr>
                                ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
        <Pagination
          totalPage={pagination.totalPages}
          currentPage={pagination.page}
          onClick={handlePageChange}
        />
      </div>
    </div>

  </>
  )
}
export default ListCenter
function useDebounce (value, delayTime) {

  const [debounceValue, setDebounceValue] = useState(value)
  const typingTimeoutRef = useRef(null)
  if (typingTimeoutRef.current)
  {
      clearTimeout(typingTimeoutRef.current)
  }

  typingTimeoutRef.current = setTimeout(() => setDebounceValue(value), delayTime)
  return debounceValue
}