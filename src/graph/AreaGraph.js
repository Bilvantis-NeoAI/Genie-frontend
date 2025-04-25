import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import MouseEventsHandler from "../utils/MouseEvents";

const AreaGraph = ({ data, title, handleFilter, keys }) => {
    const severityColors = {
        critical: "#FF0000",
        major: "#FFA500",
        minor: "#FFD700",
        cosmetic: "#87CEFA",
    };

    return (
        <div className="card g-4">
            <div>
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
            </div>

            <MouseEventsHandler>
                {({
                    scrollContainerRef,
                    handleMouseDown,
                    handleMouseMove,
                    handleMouseUp,
                    isDragging,
                }) => (
                    <div>
                        {data.length === 0 ? (
                            <div className="classnodata">No Data Found</div>
                        ) : (
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
                            <ResponsiveContainer width="150%" height={210}>
                                <AreaChart
                                    data={data}
                                    margin={{ top: 20, right: 20, left: 20 }}
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
                        )}
                    </div>
                )}
            </MouseEventsHandler>

            {data.length > 0 && (
                <div className="legend-labels">
                    {Object.entries(severityColors).map(([key, color]) => (
                        <div key={key} className="legend-box">
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 2,
                                    backgroundColor: color,
                                }}
                            ></div>
                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AreaGraph;
