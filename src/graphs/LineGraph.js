import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";

const LineGraph = ({ data, title, handleFilter, from, key }) => {
    console.log("+++data data from graph data", data, from, key);

    const xAxisKeyMapping = {
        Review: "review_name",
        Assistant: "assistant_name",
        severity: "severity",
        Application: "review",
        AverageQuality: "month",
        AverageSeverity: "month",
    };

    const xAxisDataKey = xAxisKeyMapping[from];
    const scrollStyle =
        xAxisDataKey !== "severity" && xAxisDataKey !== "month"
            ? { overflowX: "auto", scrollbarWidth: "none" }
            : {};
    const containerWidth =
        xAxisDataKey !== "severity" && xAxisDataKey !== "month" ? "150%" : "100%";

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
                <div style={{ display: "flex",  justifyContent: "space-between", width: "100%", marginTop:"-2%" }}>
                <div>{title}</div>
                <div >
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => handleFilter(data, title,key)} 
                        data-bs-toggle="offcanvas"
                        data-bs-target="#addPriority"
                        aria-controls="offcanvasRight"
                    >
                        <FilterOutlined />
                    </button>
                </div>
            </div>
            </div>
            <div style={scrollStyle}>
                <ResponsiveContainer width={containerWidth} height={240}>
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30 }}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey={xAxisDataKey} fontSize={10} tick={{ angle: 0 }} interval={0} />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Legend />
                        {xAxisDataKey !== "month" && (
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#1DB9EF"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        )}
                        {from === "severity" && (
                            <Line
                                type="monotone"
                                dataKey="percentage"
                                stroke="#1DEF81"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        )}
                        {xAxisDataKey === "month" && title === "Average Code Quality" && (
                            <Line
                                type="monotone"
                                dataKey="average_quality"
                                stroke="#1DB9EF"
                                name="Average Quality"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        )}
                        {xAxisDataKey === "month" && title === "Average Code Severity" && (
                            <Line
                                type="monotone"
                                dataKey="average_severity"
                                stroke="#1DB9EF"
                                name="Average Severity"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineGraph;
