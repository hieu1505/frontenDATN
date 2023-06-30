import { FaClinicMedical, FaHospital, FaUserAlt, FaUserNurse } from 'react-icons/fa'
import React, { useState,useMemo,useEffect ,useRef} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)
function Dashboard() {
    const [revenueByTime, setRevenueByTime] = useState([])
    return (
        <div className="content-left px-2 flex-1 pt-10 h-screen overflow-y-scroll ">
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardOne />
        <CardOne />
        <CardOne />
        
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <MultiBarChart dataRevenue={revenueByTime} />
      </div>
        </div>
    )
}
export default Dashboard
const CardOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-15 w-15 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
      <span>
      <FaUserNurse  size={40}/>
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            $3.456K
          </h4>
          <span className="text-sm font-medium">Total views</span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          0.43%
          
        </span>
      </div>
    </div>
  );
};
function MultiBarChart({ dataRevenue }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Biểu đồ doanh thu của bác sĩ'
            }
        }
    }

    const labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const data = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: dataRevenue.map(data => data.revenue),
                backgroundColor: '#FFCD58'
            },
            {
                label: 'Lợi nhuận',
                data: dataRevenue.map(data => data.profits),
                backgroundColor: '#369CE1'
            }
        ]
    }
    return <Bar options={options} data={data} />
}