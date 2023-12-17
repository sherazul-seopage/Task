import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";






export default function BarChartComponent({apiData = []}) {
    
    function createSegments(data, segmentSize) {
        const result = [];
        const totalObjects = data.length;
        let currentIndex = 0;
      
        while (currentIndex < totalObjects) {
          const segment = data.slice(currentIndex, currentIndex + segmentSize);
      
          const totalLeads = segment.reduce((sum, item) => sum + (item.deal_status || 0), 0);
      
          const startRange = currentIndex + 1;
          const endRange = Math.min(currentIndex + segmentSize, totalObjects);
      
          const segmentObject = {
            name: `${startRange}-${endRange}`,
            uv: segmentSize,
            total_leads: totalLeads,
            data: segment,
          };
      
          result.push(segmentObject);
          currentIndex += segmentSize;
        }
      
        return result;
      }
    const segmentSize = 25;
    
    const resultArray = createSegments(apiData, segmentSize);
    
  return (
    <ResponsiveContainer width="100%" height={400}>
<BarChart width={150} height={40} data={resultArray}>
<XAxis dataKey="name" />
        <YAxis tickCount={resultArray.length} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
      <Bar dataKey="total_leads" fill="#8884d8" />
    </BarChart>

    </ResponsiveContainer>
    
  );
}
