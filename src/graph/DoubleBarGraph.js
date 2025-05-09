import React, { useRef, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { Spin } from 'antd';
import { FilterOutlined } from "@ant-design/icons";
import { XAXISKEYS, DATAKEY, TITLE, XAXISNAMES } from '../utils/constatnts';

const CustomTick = ({ x, y, payload }) => {
    const valueStr = String(payload?.value || "");
    const truncatedValue = valueStr.substring(0, 5);
    return (
        <text x={x} y={y + 10} textAnchor="middle" fontSize={10} fill="#666">
            {truncatedValue}
        </text>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ background: "#fff", padding: "5px", border: "1px solid #ccc" }}>
                <p className="label">{`Name: ${label}`}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const StickyLegend = ({ items }) => (
    <div
        style={{
            position: "sticky",
            background: "#fff",
            display: "flex",
            padding: "8px",
            fontSize: "12px",
            zIndex: 2,
            gap:'5px',
            marginLeft: '45%',
            marginRight: '1%'
        }}
    >
        {items.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: 12, height: 12, backgroundColor: item.color }} />
                <span>{item.name}</span>
            </div>
        ))}
    </div>
);

const DynamicBarGraph = ({ title, data, keys, handleFilter, isLoading }) => {
    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        if (scrollContainerRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    let xAxisKey = "";
    let bars = [];
    let containerStyle = { width: "100%", height: 195, overflow: "hidden" };

    if (title === TITLE.COMMIT_ISSUES_SEVERITY) {
        xAxisKey = XAXISKEYS.SEVERITY;
        bars = [
            { key: DATAKEY.COUNT, color: "#1DB9EF", name: XAXISNAMES.COUNT },
            { key: DATAKEY.PERCENTAGE, color: "#1DEF81", name: XAXISNAMES.PERCENTAGE },
        ];
    } else if (title === TITLE.COMMIT_VIOLATE) {
        xAxisKey = XAXISKEYS.REPO_NAME;
        bars = [
            { key: DATAKEY.DISABLE_FILES_COUNT, color: "#1DB9EF", name: XAXISNAMES.DISABLE_FILES_COUNT },
            { key: DATAKEY.SECRETS_COUNT, color: "#1DEF81", name: XAXISNAMES.SECRETS_COUNT },
        ];
    }

    const graphWidth = Math.max(data.length * 50, 850);

    return (
        <div className="card g-1">
            <div className="graph-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            <div style={containerStyle}>
                {isLoading ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Spin size="large" />
                    </div>
                ) : data.length === 0 ? (
                    <div className="classnodata">No Data Found</div>
                ) : (
                    <div
                        ref={scrollContainerRef}
                        className="mouseevent"
                        style={{
                            width: "100%",
                            overflowX: "auto",
                            cursor: isDragging ? "grabbing" : "grab",
                            userSelect: "none"
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div style={{ width: `${graphWidth}px` }}>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={3}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey={xAxisKey} tick={<CustomTick />} interval={0} />
                                    <YAxis fontSize={10} />
                                    <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
                                    {bars.map((bar, index) => (
                                        <Bar key={index} dataKey={bar.key} barSize={20} fill={bar.color} name={bar.name} style={{ cursor: "pointer" }} />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
            <StickyLegend items={bars} />
        </div>
    );
};

export default DynamicBarGraph;
