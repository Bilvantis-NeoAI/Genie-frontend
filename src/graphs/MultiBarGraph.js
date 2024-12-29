import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
const CustomTick = ({ x, y, payload }) => {
    const fixedWidth = 80;
    return (
        <foreignObject x={x - fixedWidth / 2} y={y + 10} width={fixedWidth} height={30}>
            <div style={{
                width: `${fixedWidth}px`,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                textAlign: "center",
                fontSize: "10px"
            }}>
                {payload.value}
            </div>
        </foreignObject>
    );
};
const MuilBarGraph = ({ data, title, handleFilter }) => (
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
            <h6 style={{ marginTop: "-4%" }}>
                {title}
            </h6>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={handleFilter}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#addPriority"
                    aria-controls="offcanvasRight"
                >
                    <FilterOutlined />
                </button>
            </div>
        </div>

        <div style={{ overflowX: "auto", scrollbarWidth: "thin" }}>
            <ResponsiveContainer width="200%" height={240}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="project" tick={<CustomTick />} interval={0} />
                    <YAxis fontSize={10} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend />
                    <Bar dataKey="critical" fill="#1DB9EF" />
                    <Bar dataKey="major" fill="#1DEF81" />
                    <Bar dataKey="minor" fill="#1DEF81" />
                    <Bar dataKey="cosmetic" fill="#1DEF81" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default MuilBarGraph;
