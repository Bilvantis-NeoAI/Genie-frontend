import React from "react";
import { FilterOutlined } from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import MouseEventsHandler from "../utils/MouseEvents"; // import this like in AreaGraph

const TestStackedBarGraph = ({ data, title, keys, handleFilter }) => {
  const formatName = (name) =>
    name
      ? name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      : "";

  if (!data || data.length === 0) {
    return (
      <div className="card g-4">
        <div className="graph-title">
          <div>{title}</div>
          <div>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => handleFilter([], title, keys)}
              data-bs-toggle="offcanvas"
              data-bs-target="#addPriority"
              aria-controls="offcanvasRight"
              data-testid="filter-button"
            >
              <FilterOutlined />
            </button>
          </div>
        </div>
        <div className="classnodata">No Data Found</div>
      </div>
    );
  }

  const transformedData = data.map((item) => {
    const formatted = { date: item._id };
    const detailsKey = Object.keys(item).find((key) => Array.isArray(item[key]));
    if (detailsKey) {
      item[detailsKey].forEach((entry) => {
        const keyName = entry.test_case_type || entry.method;
        const value = entry.total_testcases_generated || entry.count;
        formatted[formatName(keyName)] = value;
      });
    }
    return formatted;
  });

  const barKeys = Object.keys(transformedData[0]).filter((key) => key !== "date");

  const getBarColor = (index) => {
    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a83279", "#00C49F", "#FFBB28"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="card g-1">
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
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
              position: "relative",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div>
              <BarChart
                width={Math.max(transformedData.length * 80,800)}
                height={210}
                data={transformedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={10} />
                <YAxis allowDecimals={false} fontSize={10} />
                <Tooltip cursor={{ fill: "transparent" }} />
                {barKeys.map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={getBarColor(index)}
                    name={key}
                  />
                ))}
              </BarChart>
            </div>
          </div>
        )}
      </MouseEventsHandler>

      <div
        className="legend-labels"
        style={{ marginLeft: '25%' }}
      >
        {barKeys.map((key, index) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: getBarColor(index),
                borderRadius: 2,
              }}
            />
            <span>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestStackedBarGraph;
