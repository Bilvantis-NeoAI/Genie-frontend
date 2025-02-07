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

const MuilBarGraph = ({ data, title, handleFilter, key }) => {
    const chartWidth = Math.max(data.length * 60, 800);

    return (
        <div className="card g-4">
            <div>
                <div className='graph-title'>
                    <div>{title}</div>
                    <div >
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleFilter(data, title, key)}
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

            <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>
                <ResponsiveContainer width={chartWidth} height={245}>
                    <BarChart
                        data={data}
                        barCategoryGap="25%"
                        barGap={10}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="project" tick={<CustomTick />} interval={0} />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Legend />
                        <Bar dataKey="critical" fill="#1DB9EF" barSize={20} name="Critical" />
                        <Bar dataKey="major" fill="#EF8F1D" barSize={20} name="Major" />
                        <Bar dataKey="minor" fill="#1DEF81" barSize={20} name="Minor" />
                        <Bar dataKey="cosmetic" fill="#A91DEF" barSize={20} name="Consmetic" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MuilBarGraph;
