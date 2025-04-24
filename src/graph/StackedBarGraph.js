import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import MouseEventsHandler from "../utils/MouseEvents";

const StackedBarGraph = ({ data, title }) => {
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
    const barGroupWidth = 60;
    const minChartWidth = Math.max(transformedData.length * barGroupWidth, 400);
    return (
        <div className="card g-1">
            <div className="graph-title">
                <div>{title}</div>
            </div>

            <MouseEventsHandler>
                {({
                    scrollContainerRef,
                    handleMouseDown,
                    handleMouseMove,
                    handleMouseUp,
                    isDragging,
                }) => (
                    <div
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        style={{
                            overflowX: "auto",
                            scrollbarWidth: "none",
                            height: "213px",
                            position: "relative",
                            cursor: isDragging ? "grabbing" : "grab",
                            userSelect: "none"
                        }}
                    >
                        {data.length === 0 ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    fontSize: "16px",
                                }}
                            >
                                No Data Found
                            </div>
                        ) : (
                            <div style={{ minWidth: minChartWidth }}>
                                <ResponsiveContainer width="100%" height={210}>
                                    <BarChart
                                        data={transformedData}
                                        margin={{ top: 10, right: 20, bottom: 0 }}
                                        barCategoryGap="20%"
                                        barGap={0}
                                    >
                                        <CartesianGrid strokeDasharray="2 2" />
                                        <XAxis dataKey="month" fontSize={10} />
                                        <YAxis fontSize={10} />
                                        <Tooltip cursor={{ fill: "transparent" }} />
                                        <Bar dataKey="reviewCount" stackId="a" fill="#1DB9EF" name="Review" barSize={20} />
                                        <Bar dataKey="assistantCount" stackId="a" fill="#1DEF81" name="Assistant" barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                )}
            </MouseEventsHandler>

            {data.length > 0 && (
                <div className="legend-labels">
                    <div className="legend-box">
                        <div style={{ width: 12, height: 12, backgroundColor: '#1DB9EF' }}></div>
                        <span>Review</span>
                    </div>
                    <div className="legend-box">
                        <div style={{ width: 12, height: 12, backgroundColor: "#1DEF81" }}></div>
                        <span>Assistance</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StackedBarGraph;
