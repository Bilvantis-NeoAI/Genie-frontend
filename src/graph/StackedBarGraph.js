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

const StackedBarGraph = ({ data, title, handleFilter }) => {
    const transformedData = [];
    const months = new Set();
    data.forEach(item => {
        Object.keys(item).forEach(key => {
            item[key].forEach(({ month }) => months.add(month));
        });
    });
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
        <div style={{ overflowX: "auto", scrollbarWidth: "none", height: "250px", position: "relative" }}>  {data.length === 0 ? (
                    <div  style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: "16px",
                    }}>No Data Found</div>
                ) : (
            <ResponsiveContainer height={240} width="100%">
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
            </ResponsiveContainer>)}
            </div>
        </div>
    );
};

export default StackedBarGraph;
