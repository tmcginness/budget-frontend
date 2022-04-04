import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";



const data = [
    {
        subject: "Appliances",
        amount: 999.99,
      },
      {
        subject: "Clothing",
        amount: 271.89,
      },
      {
        subject: "Coffee",
        amount: 225.99,
      },
      {
        subject: "Furniture",
        amount: 1334.15,
      },
      {
        subject: "Groceries",
        amount: 215.22,
      },
      {
        subject: "Food",
        amount: 425.65,
      },
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
}) => {
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
      
    <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="amount" stroke="#8884d8" fill="#1f83bd" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
  );
}
