import React, { useState, useRef } from "react";
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

const MuilBarGraph = ({ data, title, handleFilter, keys }) => {
    const chartWidth = Math.max(data.length * 60, 800);
    const scrollContainerRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const legendItem = (color, label) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
                style={{
                    width: 12,
                    height: 12,
                    backgroundColor: color,
                    borderRadius: 2,
                }}
            />
            <span>{label}</span>
        </div>
    );

    const handleMouseDown = (e) => {
        e.preventDefault();
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

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setScrollLeft(scrollContainerRef.current.scrollLeft);
        }
    };

    return (
        <div className="card g-4">
            {/* Header */}
            <div className='graph-title d-flex justify-content-between align-items-center'>
                <div>{title}</div>
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

            <div
                ref={scrollContainerRef}
                style={{
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    height: "205px",
                    position: "relative",
                    cursor: "grabbing" //isDragging ? "grabbing" : "grab", // Change cursor when dragging
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                {data.length === 0 ? (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: "16px",
                    }}>No Data Found</div>
                ) : (
                    <ResponsiveContainer width={chartWidth} height={206}>
                        <BarChart
                            data={data}
                            barCategoryGap="25%"
                            barGap={10}
                        >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="project" tick={<CustomTick />} interval={0} />
                            <YAxis fontSize={10} />
                            <Tooltip cursor={{ fill: "transparent" }} />
                            <Bar dataKey="critical" fill="#1DB9EF" barSize={20} name="Critical" />
                            <Bar dataKey="major" fill="#EF8F1D" barSize={20} name="Major" />
                            <Bar dataKey="minor" fill="#1DEF81" barSize={20} name="Minor" />
                            <Bar dataKey="cosmetic" fill="#A91DEF" barSize={20} name="Cosmetic" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            <div
                style={{
                    position: "sticky",
                    bottom: 0,
                    background: "#fff",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    padding: "5px",
                    fontSize: "12px",
                    zIndex: 10,
                    marginLeft: '30%',
                    marginRight: '10%'
                }}
            >
                {legendItem("#1DB9EF", "Critical")}
                {legendItem("#EF8F1D", "Major")}
                {legendItem("#1DEF81", "Minor")}
                {legendItem("#A91DEF", "Cosmetic")}
            </div>
        </div>
    );
};

export default MuilBarGraph;
