import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";
import {
    FilterOutlined
  } from "@ant-design/icons";
const HorizontalGraph = ({ data, title, handleFilter }) => (
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
                       <h6 style={{marginTop:'-4%'}}>

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
        <ResponsiveContainer width="90%" height={400}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
                barCategoryGap="20%"
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number"/>
                <YAxis
                    type="category"
                    dataKey="error" 
                    fontSize={12}
                    tick={{ angle: 0, textAnchor: "end" }}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Legend />
                <Bar dataKey="count" fill="#07439C" />
                {title === "Users" && <Bar dataKey="percentage" fill="#82ca9d" />}
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default HorizontalGraph;
