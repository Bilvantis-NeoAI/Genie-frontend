// import React, { useState, useRef } from "react";
// import {
//     ResponsiveContainer,
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Legend,
//     CartesianGrid,
// } from "recharts";
// import { DATAKEY, XAXISNAMES } from "../utils/constatnts";

// const CustomTick = ({ x, y, payload }) => {
//     const fixedWidth = 30;
//     return (
//         <foreignObject x={x - fixedWidth / 2} y={y + 10} width={fixedWidth} height={30}>
//             <div
//                 style={{
//                     width: `${fixedWidth}px`,
//                     whiteSpace: "nowrap",
//                     textOverflow: "ellipsis",
//                     overflow: "hidden",
//                     textAlign: "center",
//                     fontSize: "10px",
//                 }}
//             >
//                 {payload.value}
//             </div>
//         </foreignObject>
//     );
// };

// const CountGraph = ({ data, title }) => {
//     const chartWidth = Math.max(data.length * 60, 800);
//     const scrollContainerRef = useRef(null);

//     const [isDragging, setIsDragging] = useState(false);
//     const [startX, setStartX] = useState(0);
//     const [scrollLeft, setScrollLeft] = useState(0);

//     const handleMouseDown = (e) => {
//         e.preventDefault();
//         setIsDragging(true);
//         setStartX(e.clientX);
//     };

//     const handleMouseMove = (e) => {
//         if (!isDragging) return;
//         const moveX = e.clientX - startX;
//         if (scrollContainerRef.current) {
//             scrollContainerRef.current.scrollLeft = scrollLeft - moveX;
//         }
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//         setScrollLeft(scrollContainerRef.current.scrollLeft);
//     };

//     const handleMouseLeave = () => {
//         if (isDragging) {
//             setIsDragging(false);
//             setScrollLeft(scrollContainerRef.current.scrollLeft);
//         }
//     };

//     return (
//         <div className="card g-4">
//             <div
//                 className="flex"
//                 style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     width: "100%",
//                     marginTop: "2%",
//                     padding: "10px",
//                 }}
//             >
//                 <div>{title}</div>
//             </div>

//             <div
//                 ref={scrollContainerRef}
//                 style={{
//                     overflowX: "auto",
//                     scrollbarWidth: "none",
//                     height: "25%",
//                     position: "relative",
//                     cursor: isDragging ? "grabbing" : "grab", // Change cursor when dragging
//                 }}
//                 onMouseDown={handleMouseDown}
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUp}
//                 onMouseLeave={handleMouseLeave}
//             >
//                 {data.length === 0 ? (
//                     <div className="classnodata" >
//                         No Data Found
//                     </div>
//                 ) : (
//                     <ResponsiveContainer width={chartWidth} height={225}>
//                         <BarChart
//                             data={data}
//                             barCategoryGap="25%"
//                             barGap={10}
//                         >
//                             <CartesianGrid strokeDasharray="2 2" />
//                             <XAxis dataKey={DATAKEY.PROJECT} tick={<CustomTick />} interval={0} />
//                             <YAxis fontSize={10} />
//                             <Tooltip cursor={{ fill: "transparent" }} />
//                             <Legend />
//                             <Bar dataKey={DATAKEY.COUNT} fill="#1DB9EF" barSize={20} name={XAXISNAMES.COUNT} />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CountGraph;


import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";
import { DATAKEY, XAXISNAMES } from "../utils/constatnts";
import MouseEventsHandler from "../utils/MouseEvents";

const CustomTick = ({ x, y, payload }) => {
    const fixedWidth = 30;
    return (
        <foreignObject x={x - fixedWidth / 2} y={y + 10} width={fixedWidth} height={30}>
            <div
                style={{
                    width: `${fixedWidth}px`,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: "10px",
                }}
            >
                {payload.value}
            </div>
        </foreignObject>
    );
};

const CountGraph = ({ data, title }) => {
    const chartWidth = Math.max(data.length * 60, 800);

    return (
        <div className="card g-4">
            <div
                className="flex"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "2%",
                    padding: "10px",
                }}
            >
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
                        style={{
                            overflowX: "auto",
                            scrollbarWidth: "none",
                            height: "225px",
                            position: "relative",
                            cursor: isDragging ? "grabbing" : "grab",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {data.length === 0 ? (
                            <div className="classnodata">No Data Found</div>
                        ) : (
                            <ResponsiveContainer width={chartWidth} height="100%">
                                <BarChart
                                    data={data}
                                    barCategoryGap="25%"
                                    barGap={10}
                                >
                                    <CartesianGrid strokeDasharray="2 2" />
                                    <XAxis
                                        dataKey={DATAKEY.PROJECT}
                                        tick={<CustomTick />}
                                        interval={0}
                                    />
                                    <YAxis fontSize={10} />
                                    <Tooltip cursor={{ fill: "transparent" }} />
                                    <Legend />
                                    <Bar
                                        dataKey={DATAKEY.COUNT}
                                        fill="#1DB9EF"
                                        barSize={20}
                                        name={XAXISNAMES.COUNT}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                )}
            </MouseEventsHandler>
        </div>
    );
};

export default CountGraph;
