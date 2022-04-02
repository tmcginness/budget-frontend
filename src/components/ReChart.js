import React, { useCallback,useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";



const data = [
  { name: "Appliances", value: 991 },
  { name: "Coffee", value: 3888 },
  { name: "Electronics", value: 5 },
  { name: "Food", value: 9 },
  {name: "New", value: 3}
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function App() {
    const [categories, setCategories] = useState([]);
    const { user, isLoading } = useAuth0();
    const getCategories = () => {
        axios.get('https://glacial-journey-00163.herokuapp.com/api/sum/' + user.email)
          .then(
            (response) => setCategories(response.data),
            (error) => console.error(error))
          .catch()
      }
      useEffect(() => {
        if(isLoading===false) {getCategories();}
  }, [isLoading]);
  
    if (isLoading) {
      return <div>Loading ...</div>;
    } 
  return (
      
    <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
      </PieChart>
  );
}
