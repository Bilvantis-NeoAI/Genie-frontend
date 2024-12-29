import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import {
    FilterOutlined
} from "@ant-design/icons";
const COLORS = ["#1DB9EF", "#A91DEF", "#1DEF81", "#EF8F1D"];


const PieGraph = ({ data, title, handleFilter }) => (
    <div className="card g-4">
        <div
            className="flex"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "2%",
                padding: "10px",
            }}
        >
            <h6 style={{ marginTop: '-4%' }}>
                {title} Distribution
            </h6>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button type="button" className="btn btn-light" onClick={handleFilter} data-bs-toggle="offcanvas"
                    data-bs-target="#addPriority"
                    aria-controls="offcanvasRight">
                    <FilterOutlined />
                </button>
            </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="severity"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

export default PieGraph;
