import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
import MouseEventsHandler from "../utils/MouseEvents"; // Make sure this path is correct

const StickyLegend = ({ items }) => (
    <div
        style={{
            position: "sticky",
            background: "#fff",
            display: "flex",
            fontSize: "12px",
            zIndex: 2,
            padding: '5px',
            marginLeft: '45%',
            marginRight: '10%'
        }}
    >
        {items.map((item, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: 12, height: 12, backgroundColor: item.color }} />
                <span>{item.name}</span>
            </div>
        ))}
    </div>
);

const ReleaseBarGraph = ({ data, title, keys, handleFilter, from }) => {
    const legendItems = [
        { name: "Total Count", color: "#1DB9EF" },
    ];

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
                        style={{
                            overflowX: "auto",
                            scrollbarWidth: "none",
                            position: "relative",
                            cursor: isDragging ? "grabbing" : "grab",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {data.length === 0 ? (
                            <div className="classnodata" style={{height:'133px'}}>
                                No Data Found
                            </div>
                        ) : (
                            <div style={{ minWidth: `${data.length * 50}px` }}>
                                <ResponsiveContainer width="100%" height={210}>
                                    <BarChart
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            fontSize={10}
                                            tickFormatter={(date) => date.slice(5)}
                                        />
                                        <YAxis fontSize={10} />
                                        <Tooltip cursor={{ fill: "transparent" }} />
                                        <Bar
                                            dataKey="total_count"
                                            fill="#1DB9EF"
                                            name="Total Count"
                                            barSize={20}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                )}
            </MouseEventsHandler>

            <StickyLegend items={legendItems} />
        </div>
    );
};

export default ReleaseBarGraph;
