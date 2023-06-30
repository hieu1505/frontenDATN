
import React, { useState, useMemo, useEffect, useRef } from "react";

import {
  BiSearch,
} from "react-icons/bi";

import queryString from 'query-string'
import { useNavigate, useLocation } from "react-router-dom";
import "react-swipeable-list/dist/styles.css";
import Pagination from "../../components/Sidebar/Pagination";
import { useParams } from 'react-router-dom';

import childrenApi from "../../api/childrenApi";
function ListChildren() {
  let { id } = useParams();
  const location = useLocation()
  const [dataListchildren, setdataListchildren] = useState([])
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
    setPagination({ ...pagination, page: page })
    navigate(`?${queryString.stringify(filters)}`)
  }
  const hanleSearch = e => {
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
        queryParams.key = searchValue
        console.log(queryParams)
        const authenticated = localStorage.getItem('access_token')

        const data = await childrenApi.getallchildrent(id, {
          params: queryParams,
          headers: {
            Authorization: authenticated
          }

        })
        console.log(data)
        setdataListchildren(data.children)
        setPagination(data.page)
        // setIsLoading(false)
        console.log(queryParams)
      } catch (err) {
        alert(err)
      }
    })()
  }, [queryParams, searchValue])
  const handledelete = async (ids) => {
    try {
      const authenticated = localStorage.getItem('access_token')

      const data = await childrenApi.deletechildren(ids, {
        headers: {
          Authorization: authenticated
        }
      })
      const ListChildren = await childrenApi.getallchildrent(id, {
        params: queryParams,
        headers: {
          Authorization: authenticated
        }

      })
      console.log(ListChildren)
      setdataListchildren(ListChildren.children)

    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <div className="content-left px-1 flex-1 pt-14 h-screen overflow-y-scroll ">
      <h1 className="text-4xl">List Children</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded flex-grow" onClick={() => { navigate('/center/createchildren/' + id) }}>Create Children</button>

      <div className="border border-gray-300 rounded-lg w-full flex items-center py-3 px-3 ">
        <BiSearch className="mr-2" />
        <input type={"text"} className="flex-1 p-2 flex " placeholder="Search" onChange={e => hanleSearch(e)} />
      </div>
      <div>
        <div className="flex flex-col w-full ">
          <div className="-my-2 overflow-x-auto  ">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        age
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        JoinDate
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {dataListchildren &&
                      dataListchildren.map(children => (
                        <tr key={children.id}>
                          <td>{`${children.name} `}</td>
                          <td>{`${children.status} `}</td>
                          <td>{`${children.age} `}</td>
                          <td>{`${children.JoinDate.split(
                            'T'
                          )[0]} `}</td>

                          <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-2 rounded" onClick={() => navigate("/center/updateChildren/" + children.id)}>edit</button>
                            <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-2 rounded" onClick={() => { handledelete(children.id) }}>delete</button></td>
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
export default ListChildren
function useDebounce(value, delayTime) {

  const [debounceValue, setDebounceValue] = useState(value)
  const typingTimeoutRef = useRef(null)
  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current)
  }

  typingTimeoutRef.current = setTimeout(() => setDebounceValue(value), delayTime)
  return debounceValue
}