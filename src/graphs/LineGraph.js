
import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
import { XAXISKEYS, XAXISNAMES, TITLE, DATAKEY } from "../utils/constatnts";
const LineGraph = ({ data, title, handleFilter, from, keys }) => {
    const xAxisKeyMapping = {
        AverageQuality: XAXISKEYS.MONTH,
        AverageSeverity: XAXISKEYS.MONTH,
        severity: XAXISKEYS.WEEK
    };
    const xAxisDataKey = xAxisKeyMapping[from];
    const scrollStyle =
        xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
            ? { overflowX: "auto", scrollbarWidth: "none" }
            : {};
    const containerWidth =
        xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH ? "150%" : "100%";

    return (
        <div className="card g-4">
            <div>
                <div className='graph-title'>
                    <div>{title}</div>
                    <div >
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
            <div style={scrollStyle}>
                <ResponsiveContainer width={containerWidth} height={240}>
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30 }}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey={xAxisDataKey} fontSize={10} tick={{ angle: 0 }} interval={0} />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Legend />
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
        </div>
    );
};

export default LineGraph;