import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";

const BarGraph = ({ data, title, handleFilter, from, key }) => {
    if (from === "Assistant") {
        data = data?.map((item) => ({
            ...item,
            assistant_name: item.assistant_name
                ? item.assistant_name
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                : '',
        }));
    }
    if (from === "Review") {
        data = data?.map((item) => ({
            ...item,
            review_name: item.review_name
                ? item.review_name
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                : '',
        }));
    }

    // Define the key mappings for x-axis based on 'from'
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

    // Check if data exists, otherwise show "No Data Found"
    if (!data || data.length === 0) {
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
                        <div>
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => handleFilter(data, title, key)}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#addPriority"
                                aria-controls="offcanvasRight"
                            >
                                <FilterOutlined />
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: "center", padding: "20px"}}>
                    <h4>No Data Found</h4>
                </div>
            </div>
        );
    }

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
                    <div>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleFilter(data, title, key)}
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
                    <BarChart data={data} margin={{ top: 20, right: 30 }} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey={xAxisDataKey} fontSize={9} tick={{ angle: 0 }} interval={0} />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Legend />
                        {xAxisDataKey !== "month" && (
                            <Bar dataKey="count" fill="#1DB9EF" barSize={20} name="Count" />
                        )}
                        {from === "severity" && (
                            <Bar dataKey="percentage" fill="#1DEF81" barSize={20} name="Percentage" />
                        )}
                        {xAxisDataKey === "month" && title === "Average Code Quality" && (
                            <Bar dataKey="average_quality" fill="#1DEF81" name="Average quality" barSize={20} />
                        )}
                        {xAxisDataKey === "month" && title === "Average Code Severity" && (
                            <Bar dataKey="average_severity" fill="#1DEF81" name="Average severity" barSize={20} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarGraph;
