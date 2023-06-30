import React, { useState,useMemo,useEffect,useRef } from "react";

import {
  BiSearch,
} from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';

import queryString from 'query-string'
import { useNavigate,useLocation } from "react-router-dom";
import "react-swipeable-list/dist/styles.css";
import Pagination from "../components/Sidebar/Pagination";
import AdropApi from "../api/AdropApi";
function ListAdrop_request(){
    let { id } = useParams();
    
    const location = useLocation()
    const [DataListrequest, setDataListrequest] = useState([])
    
    const [searchValue, setSearchValue] = useState(
        () => queryString.parse(location.search).key
    )
    const hanleSearch=e=>{
        setSearchValue(e.target.value)
      }
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
            limit: Number.parseInt(params.limit) || 20,
            key: params.key || ''
        }
    }, [location.search])
    const handlePageChange = page => {
        const filters = { ...queryParams, page: page }
        setPagination({...pagination,page:page})
        navigate(`?${queryString.stringify(filters)}`)
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
            queryParams.key = searchValue
            console.log(queryParams)
            const authenticated = localStorage.getItem('access_token')
    
            const data = await AdropApi.getadroprequestbyidcenter(id, {
              params: queryParams,
              headers: {
                Authorization: authenticated
              }
    
            })
            console.log(data)
            setDataListrequest(data.adropt_request)
           
            setPagination(data.page)
            // setIsLoading(false)
            console.log(queryParams)
          } catch (err) {
            alert(err)
          }
        })()
      }, [queryParams, searchValue])
    return (<>
        <div className="content-left px-2 flex-1 pt-14 h-screen overflow-y-scroll ">
          <h1 className="text-4xl">ListAdrop_request</h1>
         
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
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          
                          <th
                            scope="col"
                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Address
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            phoneNumber
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Children Name
                          </th>
                         
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            PERSONAL INCOME
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            request
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                       SEE
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {DataListrequest &&
                                    DataListrequest.map(request => (
                                      <tr key={request.id}>
                                           <td>{`${request?.adropt_detail?.account?.profile.name} `}</td>
                                           <td>{`${request?.adropt_detail?.account?.profile.address} `}</td>
                                           <td>{`${request?.adropt_detail?.account?.profile.phoneNumber} `}</td>
                                           <td>{`${request?.children?.name} `}</td>
                                           <td>{`${request?.adropt_detail?.income} `}</td>
                                           <td>{`${request?.request} `}</td>
                                          <td className="flex flex-row">
                                          <BsFillEyeFill  size='2rem' color="blue" className="mx-2" onClick={()=>navigate("/center/AdropDetail/"+request?.children_id)}/>
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
export default ListAdrop_request
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