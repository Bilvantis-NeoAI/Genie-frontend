import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";
import {
    FilterOutlined
  } from "@ant-design/icons";
const BarGraph = ({ data, title, handleFilter }) => (
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
        <ResponsiveContainer width="80%" height={240}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 50 }}
                barCategoryGap="20%"
            >
                <XAxis
                    dataKey="name"
                    fontSize={12}
                    tick={{ angle: 0, textAnchor: "end" }}
                    interval={0}
                />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Legend />
                <Bar dataKey="count" fill="#1DB9EF" />
                {title == 'Users' ? <Bar dataKey="percentage" fill="#1DEF81" />:''}
            </BarChart>
        </ResponsiveContainer>
    </div>
);

export default BarGraph;
