import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
import { XAXISKEYS, XAXISNAMES, TITLE, DATAKEY } from "../utils/constatnts";
import MouseEventsHandler from "../utils/MouseEvents";

const LineGraph = ({ data, title, handleFilter, from, keys }) => {
    const xAxisKeyMapping = {
        AverageQuality: XAXISKEYS.MONTH,
        AverageSeverity: XAXISKEYS.MONTH,
        severity: XAXISKEYS.WEEK,
    };

    const xAxisDataKey = xAxisKeyMapping[from];
    const containerWidth = data.length > 10 ? `${data.length * 60}px` : "100%";
    const scrollStyle = data.length > 10
        ? { overflowX: "auto", scrollbarWidth: "none", position: "relative" }
        : {};

    const renderLegend = () => {
        if (
            (xAxisDataKey === XAXISKEYS.WEEK) ||
            (xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_QUALITY)
        ) {
            return (
                <span style={{ color: "#1DB9EF", fontSize: "12px", marginRight: "10px" }}>
                    {XAXISNAMES.AVARAGE_QUALITY}
                </span>
            );
        }
        if (xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_SEVERITY) {
            return (
                <span style={{ color: "#1DB9EF", fontSize: "12px", marginRight: "10px" }}>
                    {XAXISNAMES.AVARAGE_SEVERITY}
                </span>
            );
        }
        return null;
    };

    return (
        <div className="card g-4">
            <div className='graph-title'>
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
                            ...scrollStyle,
                            cursor: isDragging ? "grabbing" : "grab",
                            height: "200px",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {data.length === 0 ? (
                            <div className="classnodata">No Data Found</div>
                        ) : (
                            <div style={{ width: containerWidth }}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={data} margin={{ top: 20, right: 30 }}>
                                        <CartesianGrid strokeDasharray="2 2" />
                                        <XAxis dataKey={xAxisDataKey} fontSize={10} tick={{ angle: 0 }} interval={0} />
                                        <YAxis fontSize={10} />
                                        <Tooltip cursor={{ fill: "transparent" }} />
                                        {xAxisDataKey === XAXISKEYS.WEEK && (
                                            <Line
                                                type="monotone"
                                                dataKey={DATAKEY.AVARAGE_QUALITY}
                                                stroke="#1DB9EF"
                                                name={XAXISNAMES.AVARAGE_QUALITY}
                                                strokeWidth={2}
                                                activeDot={{ r: 8 }}
                                            />
                                        )}
                                        {xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_QUALITY && (
                                            <Line
                                                type="monotone"
                                                dataKey={DATAKEY.AVARAGE_QUALITY}
                                                stroke="#1DB9EF"
                                                name={XAXISNAMES.AVARAGE_QUALITY}
                                                strokeWidth={2}
                                                activeDot={{ r: 8 }}
                                            />
                                        )}
                                        {xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_SEVERITY && (
                                            <Line
                                                type="monotone"
                                                dataKey={DATAKEY.AVARAGE_SEVERITY}
                                                stroke="#1DB9EF"
                                                name={XAXISNAMES.AVARAGE_SEVERITY}
                                                strokeWidth={2}
                                                activeDot={{ r: 8 }}
                                            />
                                        )}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                )}
            </MouseEventsHandler>

            <div className="legend-labels">
                {renderLegend()}
            </div>
        </div>
    );
};

export default LineGraph;
