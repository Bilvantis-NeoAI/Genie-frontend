import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import {
    FilterOutlined
  } from "@ant-design/icons";
const AreaGraph = ({ data, title ,handleFilter}) => (
    <div className="card g-4">
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "2%",
                padding: "10px",
            }}
        >
            <h6 style={{marginTop:'-4%'}}>
            {title} Area Chart </h6>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button type="button" className="btn btn-light" onClick={handleFilter} data-bs-toggle="offcanvas"
                    data-bs-target="#addPriority"
                    aria-controls="offcanvasRight">
                    <FilterOutlined />
                </button>
            </div>
           
        </div>
        <ResponsiveContainer width="80%" height={240}>
            <AreaChart
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    fill="#A91DEF"
                    name="Count"
                />
                <Area
                    type="monotone"
                    dataKey="percentage"
                    stroke="#82ca9d"
                    fill="#1DEF81"
                    name="Percentage"
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default AreaGraph;