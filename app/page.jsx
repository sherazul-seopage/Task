"use client"
import BarChartComponent from '@/components/Bar/BarchartComponent';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import Sample from '@/components/SampleTableDAta/Sample';
import TableComponent from '@/components/TableComponent/TableComponent';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image'
import { useState,useEffect, useMemo } from 'react';
import { HiAdjustments } from "react-icons/hi";

export default function Home() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false)
  const [apiData, setApiData] =  useState([])

  const { isLoading, data = [] } = useQuery({
    queryKey: [`allDataFromApi`],
    queryFn: async () => {
      const response = await axios.get(
        `https://erp.seopage1.net/api/leads`
      );
if(response.data.data) setApiData([...response.data.data])
      return response.data.data;
    },
  });
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    id: true,
    client_name: true,
    project_link: true,
    project_id: true,
    value: true,
    bidding_minutes: true,
    deal_status: true,
    bid_value : true,
    
  });
  const handleCheckboxChange = (name) => {
    
    setSelectedCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: !prevCheckboxes[name],
    }));
  };
 


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let displayedItems = apiData.slice(startIndex, endIndex);



  if(isLoading) return "Loading"

  const originalData = useMemo(() => [...data], [data]);
  useEffect(() => {
    const filteredData = originalData.map((item) => {
      const filteredItem = {};
      Object.keys(item).forEach((key) => {
        if (selectedCheckboxes[key]) {
          
          filteredItem[key] = item[key] === null ? "N/A" : item[key];
        }
      });
      return filteredItem;
    });

    setApiData(filteredData);
  }, [data, selectedCheckboxes]);


  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      
       <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-80">
          You Choices
         <div className='flex flex-col gap-3 justify-start w-full items-start'>
         
        {Object.keys(selectedCheckboxes).map((name) => (
            <label key={name} htmlFor={name} className='flex gap-3 items-center justify-center' >
              {name === "id" ? "ID" : name === "client_name" ? "Name" : name === "project_link" ? "Project Link" : name === "project_id" ? "Project Id" : name === "value" ? "Project Budget" : name === "bid_value" ? "Bid Value" : name === "deal_status" ? "Status" : name === "bidding_minutes" ? "Bidding Delay Time" : name }
              <input
                name={name}
                type='checkbox'
                checked={selectedCheckboxes[name]}
                onChange={() => handleCheckboxChange(name)}
              />
            </label>
          ))}
         </div>
          
        </div>
      </Modal>
      <div className='flex items-center w-full justify-end '>
<span className='bg-gray-800 p-2 rounded-sm' onClick={() => setOpen(true)}>
<HiAdjustments className='h-4 w-4 text-white' />
</span>
      </div>
<TableComponent data={displayedItems} selectedCheckboxes={selectedCheckboxes} />
<Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={apiData.length}
        onPageChange={handlePageChange}
        setItemsPerPage={setItemsPerPage}
       
      />

      <BarChartComponent apiData={apiData} />
    </main>
  )
}
