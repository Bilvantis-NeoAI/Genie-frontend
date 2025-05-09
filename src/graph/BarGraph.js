import React from "react";
import {
    XAXISKEYS,
    DATAKEY,
    TITLE,
    XAXISNAMES,
    CANVASKEY,
} from "../utils/constatnts";
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
import MouseEventsHandler from "../utils/MouseEvents";

const BarGraph = ({ data, title, keys, handleFilter, from }) => {
    const formatName = (name) =>
        name
            ? name
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "";

    if (from === CANVASKEY.ASSISTANCE || from === CANVASKEY.REVIEW) {
        const nameKey =
            from === CANVASKEY.ASSISTANCE
                ? XAXISKEYS.ASSISTANCE
                : XAXISKEYS.REVIEW;
        data = data?.map((item) => ({
            ...item,
            [nameKey]: formatName(item[nameKey]),
        }));
    }

    const xAxisKeyMapping = {
        Review: XAXISKEYS.REVIEW,
        Assistant: XAXISKEYS.ASSISTANCE,
        severity: XAXISKEYS.SEVERITY,
        Application: XAXISKEYS.APPLICATION,
        AverageQuality: XAXISKEYS.MONTH,
        AverageSeverity: XAXISKEYS.MONTH,
    };

    const xAxisDataKey = xAxisKeyMapping[from];

    const scrollStyle =
        xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
            ? { overflowX: "auto", scrollbarWidth: "none" }
            : {};

    const containerWidth =
        xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
            ? "200%"
            : "100%";

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
                            height:'200px',
                            cursor: isDragging ? "grabbing" : "grab",
                            ...scrollStyle,
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {data.length === 0 ? (
                            <div className="classnodata">No Data Found</div>
                        ) : (
                            <ResponsiveContainer width={containerWidth} height={200}>
                                <BarChart
                                    data={data}
                                    margin={{ top: 20, right: 30 }}
                                    barCategoryGap="20%"
                                >
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis
                                        dataKey={xAxisDataKey}
                                        fontSize={9}
                                        tick={{ angle: 0 }}
                                        interval={0}
                                    />
                                    <YAxis fontSize={10} />
                                    <Tooltip cursor={{ fill: "transparent" }} />

                                    {xAxisDataKey !== XAXISKEYS.MONTH && (
                                        <Bar
                                            dataKey={DATAKEY.COUNT}
                                            fill="#1DB9EF"
                                            barSize={20}
                                            name={XAXISNAMES.COUNT}
                                        />
                                    )}
                                    {from === XAXISKEYS.SEVERITY && (
                                        <Bar
                                            dataKey={DATAKEY.PERCENTAGE}
                                            fill="#1DEF81"
                                            barSize={20}
                                            name={XAXISNAMES.PERCENTAGE}
                                        />
                                    )}
                                    {xAxisDataKey === XAXISKEYS.MONTH &&
                                        title === TITLE.AVARAGE_CODE_QUALITY && (
                                            <Bar
                                                dataKey={DATAKEY.AVARAGE_QUALITY}
                                                fill="#1DEF81"
                                                name={XAXISNAMES.AVARAGE_QUALITY}
                                                barSize={20}
                                            />
                                        )}
                                    {xAxisDataKey === XAXISKEYS.MONTH &&
                                        title === TITLE.AVARAGE_CODE_SEVERITY && (
                                            <Bar
                                                dataKey={DATAKEY.AVARAGE_SEVERITY}
                                                fill="#1DEF81"
                                                name={XAXISNAMES.AVARAGE_SEVERITY}
                                                barSize={20}
                                            />
                                        )}
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                )}
            </MouseEventsHandler>

            {data.length > 0 && (
                <div className="legend-labels">
                    {xAxisDataKey !== XAXISKEYS.MONTH && (
                        <div className="legend-box">
                            <div
                                style={{ width: 12, height: 12, backgroundColor: "#1DB9EF" }}
                            ></div>
                            <span>{XAXISNAMES.COUNT}</span>
                        </div>
                    )}
                    {from === XAXISKEYS.SEVERITY && (
                        <div className="legend-box">
                            <div
                                style={{ width: 12, height: 12, backgroundColor: "#1DEF81" }}
                            ></div>
                            <span>{XAXISNAMES.PERCENTAGE}</span>
                        </div>
                    )}
                    {xAxisDataKey === XAXISKEYS.MONTH &&
                        title === TITLE.AVARAGE_CODE_QUALITY && (
                            <div className="legend-box">
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: "#1DEF81",
                                    }}
                                ></div>
                                <span>{XAXISNAMES.AVARAGE_QUALITY}</span>
                            </div>
                        )}
                    {xAxisDataKey === XAXISKEYS.MONTH &&
                        title === TITLE.AVARAGE_CODE_SEVERITY && (
                            <div className="legend-box">
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: "#1DEF81",
                                    }}
                                ></div>
                                <span>{XAXISNAMES.AVARAGE_SEVERITY}</span>
                            </div>
                        )}
                </div>
            )}
        </div>
    );
};

export default BarGraph;
