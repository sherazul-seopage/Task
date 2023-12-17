"use client"
// DraggableTable.js
import React, { useState } from 'react';

const DraggableTable = () => {
    const columns = [
        { id: 'id', Header: 'ID' },
        { id: 'name', Header: 'Name' },
        { id: 'age', Header: 'Age' },
        { id: 'country', Header: 'Country' },
      ];
    
      const data = [
        { id: 1, name: 'John Doe', age: 25, country: 'USA' },
        { id: 2, name: 'Jane Doe', age: 30, country: 'Canada' },
        { id: 3, name: 'Bob Smith', age: 22, country: 'UK' },
        { id: 4, name: 'Alice Johnson', age: 28, country: 'Australia' },
      ];
  const [columnOrder, setColumnOrder] = useState(columns.map((col) => col.id));

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const newColumnOrder = [...columnOrder];
    const draggedIndex = newColumnOrder.indexOf(draggedId);
    const targetIndex = newColumnOrder.indexOf(targetId);

    newColumnOrder.splice(draggedIndex, 1);
    newColumnOrder.splice(targetIndex, 0, draggedId);

    setColumnOrder(newColumnOrder);
  };
  console.log('Columns:', columns);
  console.log('Column Order:', columnOrder);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          {columnOrder.map((colId) => {
            const column = columns.find((col) => col.id === colId);
            return (
              <th
                key={column.id}
                onDragStart={(e) => handleDragStart(e, column.id)}
                onDragOver={(e) => handleDragOver(e, column.id)}
                draggable
              >
                {column.Header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columnOrder.map((colId) => (
              <td key={colId}>{row[colId]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DraggableTable;
