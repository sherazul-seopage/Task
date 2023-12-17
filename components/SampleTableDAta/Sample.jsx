import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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

const TableComponent = ({ data = [], selectedCheckboxes = {} }) => {
  const [columnsOrder, setColumnsOrder] = useState(Object.keys(selectedCheckboxes));

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newColumnsOrder = Array.from(columnsOrder);
    const [removed] = newColumnsOrder.splice(result.source.index, 1);
    newColumnsOrder.splice(result.destination.index, 0, removed);

    setColumnsOrder(newColumnsOrder);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="columns" direction="horizontal">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="shadow-sm overflow-hidden my-8">
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th className='border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                      <input type='checkbox' />
                    </th>
                    {columnsOrder.map((columnName, index) => (
                      <Draggable key={columnName} draggableId={`column-${columnName}`} index={index}>
                        {(provided) => (
                          <th
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className='border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'
                          >
                            {columnName === 'id'
                              ? '#'
                              : columnName === 'client_name'
                              ? 'Name'
                              : columnName === 'project_link'
                              ? 'Project Link'
                              : columnName === 'project_id'
                              ? 'Project Id'
                              : columnName === 'value'
                              ? 'Project Budget'
                              : columnName === 'bid_value'
                              ? 'Bid Value'
                              : columnName === 'deal_status'
                              ? 'Status'
                              : columnName === 'bidding_minutes'
                              ? 'Bidding Delay Time'
                              : columnName}
                          </th>
                        )}
                      </Draggable>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-slate-800'>
                  {data.map((dataSegment, index) => (
                    <tr key={index} className=''>
            <TableDataComponent key={index} dataSegment={dataSegment} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableComponent;
