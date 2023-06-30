

import Pagination from '../../components/Sidebar/Pagination';
import ReactDatePicker from 'react-datepicker'
import React, { useEffect, useMemo, useState } from 'react'
import queryString from 'query-string'
import strftime from 'strftime'
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'
import donorapi from '../../api/donor';
function RevenueManagement() {
    let { id } = useParams();
    const [date, setDate] = useState(new Date())
    const location = useLocation()
    const navigate = useNavigate()
    const [listdonat, setlistdonat] = useState([])
    const [totalAmount,settotalAmount]=useState('')
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        return {
            page: Number.parseInt(params.page) || 0,
            limit: Number.parseInt(params.limit) || 10,
            begin: params.begin || new Date(strftime('%Y-%m-%dT00:00:00', firstDayOfMonth)).toISOString(),
            end: params.end || new Date(strftime('%Y-%m-%dT23:59:00', today)).toISOString()
        }
    }, [location.search])
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 3,
        totalElements: 11,
        page: 0
    })
    const handlePageChange = page => {
        const filters = { ...queryParams, page: page }
        setPagination({...pagination,page:page})
        navigate(`?${queryString.stringify(filters)}`)
    }
    console.log(listdonat)
    useEffect(() => {
        (async () => {
            try {
                console.log(queryParams)
                const authenticated = localStorage.getItem('access_token')
                const respone =
                        await donorapi.getdonorByIdcenter(
                           id ,
                            {
                                params: { ...queryParams },
                                headers: {
                                    Authorization: authenticated
                                }
                            }
                        )
                            setlistdonat(respone.donor)
                            settotalAmount(respone.totalAmount)
                        setPagination(respone.page)
                
            } catch (err) {
                alert(err)
            }
        })()
    }, [queryParams])
    const handleMonthChange = (value) => {
        setDate(value)
        const endDateOfMonth = new Date(value.getFullYear(), value.getMonth()+1, 0)
        const filters = {
            ...queryParams,
            begin: new Date(strftime('%Y-%m-%dT00:00:00', value)).toISOString(),
            end: new Date(strftime('%Y-%m-%dT23:59:00', endDateOfMonth)).toISOString()
        }
        navigate(`?${queryString.stringify(filters)}`)
    }
    return (<div className="content-left px-1 flex-1 pt-14 h-screen overflow-y-scroll">
        <div className="revenueManagement__container">
            <header className='text-4xl pe-2' > list support amount</header>
            <div className="border border-gray-300 rounded-lg w-full flex items-center flex space-x-[200px] py-1 px-3">
                <div className="bg-white p-2">
                    <label className="font-bold">Tháng/Năm</label>
                    <ReactDatePicker
                            selected={date}
                            showMonthYearPicker
                            className="border border-gray-300 rounded  "
                            onChange={handleMonthChange}
                        />
                </div>
                <div className="bg-white p-2">
                <header className='text-xl ' >TotalAmount:{totalAmount} VND</header>
                    
                </div>
            </div>
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
                       name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        note
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        address
                      </th>
                      
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                       phoneNumber
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                       amount(VND)
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {listdonat &&
                                listdonat.map(donor => (
                                  <tr key={donor.id}>
                                       <td>{`${donor?.account?.profile.name} `}</td>
                                       <td>{`${donor?.note} `}</td>
                                       <td>{`${donor?.account?.profile.address} `}</td>
                                       <td>{ `${donor?.account?.profile.phoneNumber} `}</td>
                                       <td>{`${donor?.amount} `}</td>
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
    )
}
export default RevenueManagement