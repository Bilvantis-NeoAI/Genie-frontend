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

const StackedBarGraph = ({ data, title, handleFilter }) => {
    // Transforming data to be used in Recharts
    const transformedData = [];
    const months = new Set();

    // Extract all months from the data
    data.forEach(item => {
        Object.keys(item).forEach(key => {
            item[key].forEach(({ month }) => months.add(month));
        });
    });

    // Transform data for Recharts
    [...months].forEach(month => {
        const monthData = { month };
        data.forEach(item => {
            Object.keys(item).forEach(key => {
                const entry = item[key].find(d => d.month === month);
                if (entry) {
                    monthData[`${key}Count`] = entry.count;
                }
            });
        });
        transformedData.push(monthData);
    });

    return (
        <div className="card g-4" style={{ marginBottom: "8px" }}>
            <div>
                <div className='graph-title'>
                    <div>{title}</div>
                </div>
            </div>
            <ResponsiveContainer height={255} width="100%">
                <BarChart
                    data={transformedData}
                    margin={{ top: 10, right: 20, bottom: 0 }}
                    barCategoryGap="2%"
                    barGap={0}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis dataKey="month" fontSize={10} tick={{ angle: 0 }} />
                    <YAxis fontSize={10} />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend />
                    <Bar
                        dataKey="reviewCount"
                        stackId="a"
                        fill="#1DB9EF"
                        name="Review"
                        barSize={20}
                    />
                    <Bar
                        dataKey="assistantCount"
                        stackId="a"
                        fill="#1DEF81"
                        name="Assistant"
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedBarGraph;
