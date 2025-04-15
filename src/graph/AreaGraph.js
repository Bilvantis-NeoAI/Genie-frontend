// import React from "react";
// import {
//     ResponsiveContainer,
//     AreaChart,
//     Area,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip
// } from "recharts";
// import { FilterOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";

// const AreaGraph = ({ data, title, handleFilter, keys }) => {
//     const severityColors = {
//         critical: "#FF0000",
//         major: "#FFA500",
//         minor: "#FFD700",
//         cosmetic: "#87CEFA",
//     };

//     return (
//         <div className="card g-4">
//             <div>
//                 <div className="graph-title">
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

//             <div style={{ overflowX: "auto", scrollbarWidth: "none", height: "212px", position: "relative" }}>
//                 {data.length === 0 ? (
//                     <div
//                         style={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                             fontSize: "16px",
//                         }}
//                     >
//                         No Data Found
//                     </div>
//                 ) : (
//                     <ResponsiveContainer width="150%" height="100%">
//                         <AreaChart
//                             data={data}
//                             margin={{
//                                 top: 20,
//                                 right: 20,
//                                 left: 20,
//                             }}
//                         >
//                             <CartesianGrid strokeDasharray="2 2" />
//                             <XAxis
//                                 dataKey="date"
//                                 tickFormatter={(tick) => dayjs(tick).format("D'MMM YY")}
//                                 fontSize={10}
//                             />
//                             <YAxis fontSize={10} />
//                             <Tooltip
//                                 formatter={(value, name) => {
//                                     return name === "issue_count"
//                                         ? [`${value} issues`, "Issue Count"]
//                                         : value;
//                                 }}
//                             />
//                             {Object.keys(severityColors).map((severity) => (
//                                 <Area
//                                     key={severity}
//                                     type="monotone"
//                                     dataKey={severity}
//                                     stroke={severityColors[severity]}
//                                     fill={severityColors[severity]}
//                                     name={severity.charAt(0).toUpperCase() + severity.slice(1)}
//                                 />
//                             ))}
//                         </AreaChart>
//                     </ResponsiveContainer>
//                 )}
//             </div>
//             {data.length > 0 && (
//     <div
//         style={{
//             position: "sticky",
//             background: "#fff",
//             display: "flex",
//             gap: "16px",
//             padding: "8px",
//             fontSize: "12px",
//             zIndex: 2,
//             padding:'5px',
//             marginLeft: '45%',
//             marginRight:'10%'
//         }}
//     >
//         {Object.entries(severityColors).map(([key, color]) => (
//             <div key={key}
//                 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
//                 <div
//                     style={{
//                         width: 12,
//                         height: 12,
//                         borderRadius: 2,
//                         backgroundColor: color,
//                     }}
//                 ></div>
//                 <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
//             </div>
//         ))}
//     </div>
// )}


//         </div>
//     );
// };

// export default AreaGraph;

import React, { useState, useRef } from "react";
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

const AreaGraph = ({ data, title, handleFilter, keys }) => {
    const severityColors = {
        critical: "#FF0000",
        major: "#FFA500",
        minor: "#FFD700",
        cosmetic: "#87CEFA",
    };

    // State and references for drag functionality
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollContainerRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const moveX = e.clientX - startX;
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollLeft - moveX;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
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

            <div
                ref={scrollContainerRef}
                style={{
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    height: "212px",
                    position: "relative",
                    cursor: isDragging ? "grabbing" : "grab", // Add grabbing cursor when dragging
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // End dragging when mouse leaves the area
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
                    <ResponsiveContainer width="150%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                            }}
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
                )}
            </div>
            {data.length > 0 && (
                <div
                    style={{
                        position: "sticky",
                        background: "#fff",
                        display: "flex",
                        gap: "16px",
                        padding: "8px",
                        fontSize: "12px",
                        zIndex: 2,
                        padding: "5px",
                        marginLeft: "45%",
                        marginRight: "10%",
                    }}
                >
                    {Object.entries(severityColors).map(([key, color]) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
