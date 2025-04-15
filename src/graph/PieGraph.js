import React from "react";
import { DATAKEY, XAXISKEYS } from "../utils/constatnts";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import {
    FilterOutlined
} from "@ant-design/icons";
const COLORS = ["#1DB9EF", "#A91DEF", "#1DEF81", "#EF8F1D"];
const PieGraph = ({ data, title, handleFilter, keys }) => (
    <div className="card g-4">
        <div>
            <div className='graph-title'>
                <div>{title}</div>
                <div >
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleFilter(data, title, keys)}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#addPriority"
                        aria-controls="offcanvasRight"
                        data-testid="filter-button"
                    >
                        <FilterOutlined />
                    </button>
                </div>
            </div>
        </div>
        <div style={{ overflowX: "auto", scrollbarWidth: "none", height: "240px", position: "relative" }}>
        {data.length === 0 ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: "16px",
                    }}>No Data Found</div>
                ) : (
        <ResponsiveContainer width="100%" height={240}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey={DATAKEY.PERCENTAGE}
                    nameKey={XAXISKEYS.SEVERITY}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip   contentStyle={{ fontSize: "12px" }}/>
                <Legend wrapperStyle={{ fontSize: "12px" }}/>
            </PieChart>
        </ResponsiveContainer>
                )}
                </div>
    </div>
);

export default PieGraph;