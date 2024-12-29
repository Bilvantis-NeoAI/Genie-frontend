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

const StackedBarGraph = ({ data, title, handleFilter, from }) => {
    const transformedData = data.map((item) => {
        const reviewData = item.review?.[0] || { month: "", count: 0 };
        const assistantData = item.assistant?.[0] || { month: reviewData.month, count: 0 };
        return {
            month: reviewData.month || assistantData.month || "Unknown",
            reviewCount: reviewData.count,
            assistantCount: assistantData.count,
        };
    });
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

            <ResponsiveContainer height={240}>
                <BarChart
                    data={transformedData}
                    margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                    barCategoryGap="10%"
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="month" fontSize={10} tick={{ angle: 0 }} interval={0} />
                    <YAxis fontSize={10} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend />
                    <Bar dataKey="reviewCount" stackId="a" fill="#8884d8" name="Review" barSize={15} />
                    <Bar dataKey="assistantCount" stackId="a" fill="#82ca9d" name="Assistant" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedBarGraph;
