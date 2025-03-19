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
import { DATAKEY,XAXISNAMES } from "../utils/constatnts";
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
            <div style={{ overflowX: "auto", scrollbarWidth: "none", height: "240px", position: "relative" }}>
            {data.length === 0 ? (
                    <div  style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: "16px",
                    }}>No Data Found</div>
                ) : (
            <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>

                <ResponsiveContainer width={chartWidth} height={240}>
                    <BarChart
                        data={data}
                        barCategoryGap="25%"
                        barGap={10}
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey={DATAKEY.PROJECT} tick={<CustomTick />} interval={0} />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Legend />
                        <Bar dataKey={DATAKEY.COUNT} fill="#1DB9EF" barSize={20} name={XAXISNAMES.COUNT} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
                )}
                </div>
        </div>
    );
};
export default CountGraph;