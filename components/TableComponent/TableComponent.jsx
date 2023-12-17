"use client"





import React from 'react';
import { HiDotsVertical } from "react-icons/hi";

const TableDataComponent = ({dataSegment = {}}) => {
    // console.log(dataSegment)
    const { id, client_name, project_link, project_id,value, bid_value,deadline, deal_status, bidding_minutes, bidding_seconds } = dataSegment
    // console.log(dataSegment)
    return <tr className=''>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400"><input type='checkbox' /></td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">{id}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400 max-w-[200px] truncate">{client_name}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400 max-w-[200px] truncate">{project_link}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">{project_id ? project_id : null}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">{value ? value : null}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">{ dataSegment.hasOwnProperty(["bid_value"]) ? bid_value ? bid_value : "N/A" : null}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400 whitespace-nowrap">{bidding_minutes ? `${bidding_minutes} minutes` : null} </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400">{ dataSegment.hasOwnProperty(["deal_status"]) ? !!deal_status ?  <p className='bg-green-500 rounded-md text-sm whitespace-nowrap text-black text-center p-1'>Converted to Deal</p> : <p className='bg-red-500 whitespace-nowrap rounded-md text-sm text-black text-center p-1'>Not Converted</p> : null}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400 pl-8"><HiDotsVertical /></td>
    
  </tr>
}

const TableComponent = ({ data = [], selectedCheckboxes ={} }) => {


  return (
    <div class="shadow-sm overflow-hidden my-8">
  <table class="border-collapse table-auto  text-sm">
    <thead>
      <tr>
      <th class="border-b dark:border-slate-600 font-medium p-4  pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"><input type="checkbox" /></th>

     
          
  {Object.entries(selectedCheckboxes).map(([name, isVisible]) => (
  isVisible && (
    <th key={name} className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
      {name === "id" ? "#" : name === "client_name" ? "Name" : name === "project_link" ? "Project Link" : name === "project_id" ? "Project Id" : name === "value" ? "Project Budget" : name === "bid_value" ? "Bid Value" : name === "deal_status" ? "Status" : name === "bidding_minutes" ? "Bidding Delay Time" : name}
    </th>
  )
))}
  
        <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Action</th>
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-slate-800">
      {
        data.map((dataSegment, index)=>(
            <TableDataComponent key={index} dataSegment={dataSegment} />
        ))
      }
      
    </tbody>
  </table>
</div>
  );
};

export default TableComponent;


