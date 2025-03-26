import React from "react";
import { FilterOutlined } from "@ant-design/icons";

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
const TestStackedBarGraph = ({ data, title, keys, handleFilter, from }) => {
    if (!data || data.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "1rem" }}>
                <h3>{title}</h3>
                <p>No data available</p>
            </div>
        );
    }

    const transformedData = data.map((item) => {
        const formatted = { date: item._id };
        const detailsKey = Object.keys(item).find(
            key => Array.isArray(item[key])
        );

        if (detailsKey) {
            item[detailsKey].forEach((entry) => {
                const keyName = entry.test_case_type || entry.method;
                const value = entry.total_testcases_generated || entry.count;
                formatted[keyName] = value;
            });
        }

        return formatted;
    });

    const barKeys = Object.keys(transformedData[0] || {}).filter(key => key !== "date");

    return (
        <div className="card g-4">
            <div>
                <div className='graph-title'>
                    <div>{title}</div>
                    {/* <div >
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
                    </div> */}
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
                    <div>
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart
                                data={transformedData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                barSize={20}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                {barKeys.map((key, index) => (
                                    <Bar key={key} dataKey={key} stackId="a" fill={getBarColor(index)} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

const getBarColor = (index) => {
    const colors = [
        "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a83279", "#00C49F", "#FFBB28"
    ];
    return colors[index % colors.length];
};
export default TestStackedBarGraph;
