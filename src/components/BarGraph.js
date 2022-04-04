import React from "react";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Appliances",
    amount: 999.99,
  },
  {
    name: "Clothing",
    amount: 71.89,
  },
  {
    name: "Coffee",
    amount: 5.99,
  },
  {
    name: "Furniture",
    amount: 1334.15,
  },
  {
    name: "Groceries",
    amount: 215.22,
  },
  {
    name: "Food",
    amount: 425.65,
  },
];

export default function App() {
  return (
    <ResponsiveContainer width='100%' height={300}>
    <BarChart
      width={400}
      height='100%'
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" stackId="a" fill="#1f83bd" />
    </BarChart>
    </ResponsiveContainer>
  );
}
