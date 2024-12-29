import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";

const BarGraph = ({ data, title, handleFilter, from }) => {
    const xAxisKeyMapping = {
        Review: "review_name",
        Assistant: "assistant_name",
        severity: "severity",
        Application: "review",
        AverageQuality: 'month',
        AverageSeverity: 'month'
    };
    const xAxisDataKey = xAxisKeyMapping[from] || "default_key";
    const scrollStyle = xAxisDataKey !== "severity" && xAxisDataKey !== "month" ? { overflowX: "auto", scrollbarWidth: "none" } : {};
    const containerWidth = xAxisDataKey !== "severity" && xAxisDataKey !== "month" ? "150%" : "100%"; // Set width based on condition

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
            <div style={scrollStyle}>
                <ResponsiveContainer width={containerWidth} height={240}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 50 }}
                        barCategoryGap="20%"
                    >                    <CartesianGrid strokeDasharray="2 2" />

                        <XAxis
                            dataKey={xAxisDataKey}
                            fontSize={10}
                            tick={{ angle: 0 }}
                            interval={0}
                        />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Legend />
                        {xAxisDataKey !== 'month' && <Bar dataKey="count" fill="#1DB9EF" barSize={20} />}
                        {from === "severity" &&
                            <Bar dataKey="percentage" fill="#1DEF81" barSize={20} />}
                        {xAxisDataKey === 'month' && title === 'Average Code Quality' && <Bar dataKey='average_quality' fill="#1DEF81" barSize={20} />}
                        {xAxisDataKey === 'month' && title === 'Average Code Severity' && <Bar dataKey='average_severity' fill="#1DEF81" barSize={20} />}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarGraph;