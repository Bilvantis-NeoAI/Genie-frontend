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
import { FilterOutlined } from "@ant-design/icons";

const CustomTick = ({ x, y, payload }) => {
    const fixedWidth = 30;
    return (
        <foreignObject x={x - fixedWidth / 2} y={y + 10} width={fixedWidth} height={30}>
            <div
                style={{
                    width: `${fixedWidth}px`,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: "10px",
                }}
            >
                {payload.value}
            </div>
        </foreignObject>
    );
};

const MuilBarGraph = ({ data, title, handleFilter, keys }) => {
    const chartWidth = Math.max(data.length * 60, 800);

    return (
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
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "-2%" }}>
                    <div>{title}</div>
                    <div >
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleFilter(data, title, keys)}
                            data-bs-toggle="offcanvas"
                            data-bs-target="#addPriority"
                            aria-controls="offcanvasRight"
                        >
                            <FilterOutlined />
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>
                <ResponsiveContainer width={chartWidth} height={240}>
                    <BarChart
                        data={data}
                        barCategoryGap="25%"
                        barGap={10}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="project" tick={<CustomTick />} interval={0} fontSize={10} />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }}/>
                        <Legend />
                        <Bar dataKey="critical" fill="#1DB9EF" barSize={30} name="Critical"/>
                        <Bar dataKey="major" fill="#1DEF81" barSize={30} name="Major" />
                        <Bar dataKey="minor" fill="#FFD700" barSize={30} name="Minor" />
                        <Bar dataKey="cosmetic" fill="#FF69B4" barSize={30} name="Consmetic" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MuilBarGraph;
