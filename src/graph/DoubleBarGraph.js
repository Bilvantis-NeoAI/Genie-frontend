import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
import { XAXISKEYS, DATAKEY, TITLE, XAXISNAMES } from '../utils/constatnts';

const CustomTick = ({ x, y, payload }) => {    
    const truncatedValue = payload?.value?.substring(0, 5);
    return (
        <text x={x} y={y + 10} textAnchor="middle" fontSize={10} fill="#666">
            {truncatedValue}
        </text>
    );
};
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ background: "#fff", padding: "5px", border: "1px solid #ccc" }}>
                <p className="label">{`Name: ${label}`}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};
const DynamicBarGraph = ({ title, data, keys, handleFilter }) => {
    let xAxisKey = "";
    let bars = [];
    let containerStyle = { width: "100%", height: 240, overflow: "hidden" };

    if (title === TITLE.COMMIT_ISSUES_SEVERITY) {
        xAxisKey = XAXISKEYS.SEVERITY;
        bars = [
            { key: DATAKEY.COUNT, color: "#1DB9EF", name: XAXISNAMES.COUNT },
            { key: DATAKEY.PERCENTAGE, color: "#1DEF81", name: XAXISNAMES.PERCENTAGE },
        ];
    } else if (title === TITLE.COMMIT_VIOLATE) {
        xAxisKey = XAXISKEYS.REPO_NAME;
        bars = [
            { key: DATAKEY.DISABLE_FILES_COUNT, color: "#1DB9EF", name: XAXISNAMES.DISABLE_FILES_COUNT },
            { key: DATAKEY.SECRETS_COUNT, color: "#1DEF81", name: XAXISNAMES.SECRETS_COUNT },
        ];
    }

    const graphWidth = Math.max(data.length * 50, 580);

    return (
        <div className="card g-4">
            <div className="graph-title">
                <div>{title}</div>
                <div>
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

            <div style={containerStyle}>
                {data.length === 0 ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        color: "#999",
                        fontSize: "14px"
                    }}>
                        No Data Found
                    </div>
                ) : (
                    <div style={{ width: "100%", overflowX: "auto" }}>
                        <div style={{ width: `${graphWidth}px` }}>
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={3}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={xAxisKey} tick={<CustomTick />} interval={0} />
                                    <YAxis fontSize={10} />
                                    <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
                                    <Legend />
                                    {bars.map((bar, index) => (
                                        <Bar key={index} dataKey={bar.key} barSize={20} fill={bar.color} name={bar.name} style={{ cursor: "pointer" }}/>
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicBarGraph;

