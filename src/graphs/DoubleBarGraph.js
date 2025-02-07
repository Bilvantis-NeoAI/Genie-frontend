import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
import { XAXISKEYS, DATAKEY, TITLE, XAXISNAMES } from '../utils/constatnts'

const DynamicBarGraph = ({ title, data, keys, handleFilter }) => {
    let xAxisKey = "";
    let bars = [];
    let containerStyle = { width: "100%", height: 240, overflow: "hidden" };
    let innerStyle = { width: "100%", height: "100%" };

    if (title === TITLE.COMMIT_ISSUES_SEVERITY) {
        containerStyle = { width: "100%", height: 240, overflow: "hidden" };
        xAxisKey = XAXISKEYS.SEVERITY
        bars = [
            { key: DATAKEY.COUNT, color: "#1DB9EF", name: XAXISNAMES.COUNT },
            { key: DATAKEY.PERCENTAGE, color: "#1DEF81", name: XAXISNAMES.PERCENTAGE },
        ];
    } else if (title === TITLE.COMMIT_VIOLATE) {
        xAxisKey = XAXISKEYS.REPO_NAME
        bars = [
            { key: DATAKEY.DISABLE_FILES_COUNT, color: "#1DB9EF", name: XAXISNAMES.DISABLE_FILES_COUNT },
            { key: DATAKEY.SECRETS_COUNT, color: "#1DEF81", name: XAXISNAMES.SECRETS_COUNT },
        ];
        containerStyle = {
            ...containerStyle,
            overflowX: "auto",
            scrollbarWidth: "none"
        };
        innerStyle = { ...innerStyle, width: "800px" };
    }

    return (
        <div className="card g-4" >
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
            <div style={containerStyle}>
                <div style={innerStyle}>
                    <ResponsiveContainer>
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barGap={3}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={xAxisKey} fontSize={10} />
                            <YAxis fontSize={10} />
                            <Tooltip cursor={{ fill: "transparent" }} />
                            <Legend />
                            {bars.map((bar, index) => (
                                <Bar
                                    key={index}
                                    dataKey={bar.key}
                                    barSize={20}
                                    fill={bar.color}
                                    name={bar.name}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DynamicBarGraph;
