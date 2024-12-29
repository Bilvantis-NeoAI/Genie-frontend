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
import { FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const AreaGraph = ({ data, title, handleFilter }) => {
    const severityColors = {
        critical: "#FF0000",
        major: "#FFA500",
        minor: "#FFD700",
        cosmetic: "#87CEFA",
    };

    return (
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
                <h6 style={{ marginTop: "-4%" }}>{title}</h6>
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
            <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>

                <ResponsiveContainer width="150%" height={220}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(tick) => dayjs(tick).format("D'MMM YY")}
                            fontSize={10}
                        />
                        <YAxis fontSize={10} />
                        <Tooltip
                            formatter={(value, name) => {
                                return name === "issue_count"
                                    ? [`${value} issues`, "Issue Count"]
                                    : value;
                            }}

                        />
                        <Legend />
                        {Object.keys(severityColors).map((severity) => (
                            <Area
                                key={severity}
                                type="monotone"
                                dataKey={severity}
                                stroke={severityColors[severity]}
                                fill={severityColors[severity]}
                                name={severity.charAt(0).toUpperCase() + severity.slice(1)}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AreaGraph;
