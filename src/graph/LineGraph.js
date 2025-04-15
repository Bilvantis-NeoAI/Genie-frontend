// import React from "react";
// import {
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     CartesianGrid,
//     Legend,
// } from "recharts";
// import { FilterOutlined } from "@ant-design/icons";
// import { XAXISKEYS, XAXISNAMES, TITLE, DATAKEY } from "../utils/constatnts";

// const LineGraph = ({ data, title, handleFilter, from, keys }) => {
//     const xAxisKeyMapping = {
//         AverageQuality: XAXISKEYS.MONTH,
//         AverageSeverity: XAXISKEYS.MONTH,
//         severity: XAXISKEYS.WEEK
//     };
//     const xAxisDataKey = xAxisKeyMapping[from];
//     const scrollStyle =
//         xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
//             ? { overflowX: "auto", scrollbarWidth: "none" }
//             : {};
//     const containerWidth =
//         xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH ? "150%" : "100%";

//     return (
//         <div className="card g-4">
//             <div>
//                 <div className='graph-title'>
//                     <div>{title}</div>
//                     <div>
//                         <button
//                             type="button"
//                             className="btn btn-light"
//                             onClick={() => handleFilter(data, title, keys)}
//                             data-bs-toggle="offcanvas"
//                             data-bs-target="#addPriority"
//                             aria-controls="offcanvasRight"
//                             data-testid="filter-button"
//                         >
//                             <FilterOutlined />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div style={scrollStyle}>
//                 {data.length === 0 ? (
//                     <div style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         height: "240px",
//                         color: "#999",
//                         fontSize: "14px"
//                     }}>
//                         No Data Found
//                     </div>
//                 ) : (
//                     <ResponsiveContainer width={containerWidth} height={240}>
//                         <LineChart data={data} margin={{ top: 20, right: 30 }}>
//                             <CartesianGrid strokeDasharray="2 2" />
//                             <XAxis dataKey={xAxisDataKey} fontSize={10} tick={{ angle: 0 }} interval={0} />
//                             <YAxis fontSize={10} />
//                             <Tooltip cursor={{ fill: "transparent" }} />
//                             <Legend />
//                             {xAxisDataKey === XAXISKEYS.WEEK && (
//                                 <Line
//                                     type="monotone"
//                                     dataKey={DATAKEY.AVARAGE_QUALITY}
//                                     stroke="#1DB9EF"
//                                     name={XAXISNAMES.AVARAGE_QUALITY}
//                                     strokeWidth={2}
//                                     activeDot={{ r: 8 }}
//                                 />
//                             )}
//                             {xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_QUALITY && (
//                                 <Line
//                                     type="monotone"
//                                     dataKey={DATAKEY.AVARAGE_QUALITY}
//                                     stroke="#1DB9EF"
//                                     name={XAXISNAMES.AVARAGE_QUALITY}
//                                     strokeWidth={2}
//                                     activeDot={{ r: 8 }}
//                                 />
//                             )}
//                             {xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_SEVERITY && (
//                                 <Line
//                                     type="monotone"
//                                     dataKey={DATAKEY.AVARAGE_SEVERITY}
//                                     stroke="#1DB9EF"
//                                     name={XAXISNAMES.AVARAGE_SEVERITY}
//                                     strokeWidth={2}
//                                     activeDot={{ r: 8 }}
//                                 />
//                             )}
//                         </LineChart>
//                     </ResponsiveContainer>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LineGraph;
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

const LineGraph = ({ data, title, handleFilter, from, keys }) => {
    const xAxisKeyMapping = {
        AverageQuality: XAXISKEYS.MONTH,
        AverageSeverity: XAXISKEYS.MONTH,
        severity: XAXISKEYS.WEEK
    };

    const xAxisDataKey = xAxisKeyMapping[from];
    const scrollStyle =
        xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
            ? { overflowX: "auto", scrollbarWidth: "none", position: "relative" }
            : {};
    const containerWidth =
        xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH ? "150%" : "100%";

    // Define legend manually since it's now outside the chart
    const renderLegend = () => {
        if (
            (xAxisDataKey === XAXISKEYS.WEEK) ||
            (xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_QUALITY)
        ) {
            return <span style={{ color: "#1DB9EF", fontSize: "12px", marginRight: "10px" }}>{XAXISNAMES.AVARAGE_QUALITY}</span>;
        }
        if (xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_SEVERITY) {
            return <span style={{ color: "#1DB9EF", fontSize: "12px", marginRight: "10px" }}>{XAXISNAMES.AVARAGE_SEVERITY}</span>;
        }
        return null;
    };

    return (
        <div className="card g-4">
            <div>
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
            </div>

            {/* Sticky legend */}
           

            <div style={scrollStyle}>
                {data.length === 0 ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "240px",
                        color: "#999",
                        fontSize: "14px"
                    }}>
                        No Data Found
                    </div>
                ) : (
                    <ResponsiveContainer width={containerWidth} height={200}>
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
                )}
            </div>
            <div style={{ position: "sticky",
            background: "#fff",
            display: "flex",
            gap: "16px",
            padding: "8px",
            fontSize: "12px",
            zIndex: 2,
            marginLeft:'45%',
            marginRight:'10%' }}>
                {renderLegend()}
            </div>
        </div>
    );
};

export default LineGraph;
