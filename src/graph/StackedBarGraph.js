
import React, { useRef, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const StackedBarGraph = ({ data, title }) => {

    const scrollContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Prepare transformed data
    const transformedData = [];
    const months = new Set();
    data.forEach(item => {
        Object.keys(item).forEach(key => {
            item[key].forEach(({ month }) => months.add(month));
        });
    });

    [...months].forEach(month => {
        const monthData = { month };
        data.forEach(item => {
            Object.keys(item).forEach(key => {
                const entry = item[key].find(d => d.month === month);
                if (entry) {
                    monthData[`${key}Count`] = entry.count;
                }
            });
        });
        transformedData.push(monthData);
    });

    const barGroupWidth = 60;
    const minChartWidth = Math.max(transformedData.length * barGroupWidth, 400);

    // Scroll with mouse wheel
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    // Drag to scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - container.offsetLeft);
            setScrollLeft(container.scrollLeft);
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5; // multiplier for drag speed
            container.scrollLeft = scrollLeft - walk;
        };

        const stopDragging = () => {
            setIsDragging(false);
        };

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", stopDragging);
        container.addEventListener("mouseup", stopDragging);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", stopDragging);
            container.removeEventListener("mouseup", stopDragging);
        };
    }, [isDragging, startX, scrollLeft]);

    return (
        <div className="card g-4">
            <div className='graph-title'>
                <div>{title}</div>
            </div>

            <div
                ref={scrollContainerRef}
                style={{
                    overflowX: "auto",
                    scrollbarWidth:'none',
                    height: "213px",
                    position: "relative",
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none"
                }}
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
                    <div style={{ minWidth: minChartWidth }}>
                        <ResponsiveContainer width="100%" height={210}>
                            <BarChart
                                data={transformedData}
                                margin={{ top: 10, right: 20, bottom: 0 }}
                                barCategoryGap="20%"
                                barGap={0}
                            >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="month" fontSize={10} />
                                <YAxis fontSize={10} />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Bar dataKey="reviewCount" stackId="a" fill="#1DB9EF" name="Review" barSize={20} />
                                <Bar dataKey="assistantCount" stackId="a" fill="#1DEF81" name="Assistant" barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {data.length > 0 && (
                <div
                    style={{
                        position: "sticky",
                        background: "#fff",
                        display: "flex",
                        gap: "16px",
                        padding: '5px',
                        fontSize: "12px",
                        zIndex: 2,
                        marginLeft: '45%',
                        marginRight: '10%',
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: 12, height: 12, backgroundColor: '#1DB9EF' }}></div>
                        <span>Review</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: 12, height: 12, backgroundColor: "#1DEF81" }}></div>
                        <span>Assistance</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StackedBarGraph;

