// import React from "react";
// import { FilterOutlined } from "@ant-design/icons";
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

// const TestStackedBarGraph = ({ data, title, keys, handleFilter, from }) => {
//     const formatName = (name) =>
//         name
//             ? name
//                   .split('_')
//                   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                   .join(' ')
//             : '';
//     if (!data || data.length === 0) {
//         return (
//             <div className="card g-4">
//                 <div className="graph-title">
//                     <div>{title}</div>
//                     <div>
//                         <button
//                             type="button"
//                             className="btn btn-light"
//                             onClick={() => handleFilter([], title, keys)}
//                             data-bs-toggle="offcanvas"
//                             data-bs-target="#addPriority"
//                             aria-controls="offcanvasRight"
//                             data-testid="filter-button"
//                         >
//                             <FilterOutlined />
//                         </button>
//                     </div>
//                 </div>
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         height: "240px",
//                         fontSize: "16px",
//                     }}
//                 >
//                     No Data Found
//                 </div>
//             </div>
//         );
//     }

//     // Transforming incoming data into chart-compatible format
//     const transformedData = data.map((item) => {
//         const formatted = { date: item._id };
//         const detailsKey = Object.keys(item).find((key) => Array.isArray(item[key]));
//         if (detailsKey) {
//             item[detailsKey].forEach((entry) => {
//                 const keyName = entry.test_case_type || entry.method;
//                 const value = entry.total_testcases_generated || entry.count;
//                 formatted[formatName(keyName)] = value;
//             });
//         }
//         return formatted;
//     });

//     const barKeys = Object.keys(transformedData[0]).filter((key) => key !== "date");

//     const getBarColor = (index) => {
//         const colors = [
//             "#8884d8",
//             "#82ca9d",
//             "#ffc658",
//             "#ff8042",
//             "#a83279",
//             "#00C49F",
//             "#FFBB28",
//         ];
//         return colors[index % colors.length];
//     };

//     return (
//         <div className="card g-4">
//             <div className="graph-title">
//                 <div>{title}</div>
//                 <div>
//                     <button
//                         type="button"
//                         className="btn btn-light"
//                         onClick={() => handleFilter(data, title, keys)}
//                         data-bs-toggle="offcanvas"
//                         data-bs-target="#addPriority"
//                         aria-controls="offcanvasRight"
//                         data-testid="filter-button"
//                     >
//                         <FilterOutlined />
//                     </button>
//                 </div>
//             </div>
//             <div style={{ overflowX: "auto", scrollbarWidth: "none", height: "240px" }}>
//                 <div>
//                     <ResponsiveContainer width="100%" height={240}>
//                         <BarChart
//                             data={transformedData}
//                             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                             barSize={20}
//                         >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" fontSize={10} />
//                             <YAxis allowDecimals={false} fontSize={10} />
//                             <Tooltip cursor={{ fill: "transparent" }} />
//                             <Legend wrapperStyle={{ fontSize: 12 }} />
//                             {barKeys.map((key, index) => (
//                                 <Bar
//                                     key={key}
//                                     dataKey={key}
//                                     stackId="a"
//                                     fill={getBarColor(index)}
//                                     name={key}
//                                 />
//                             ))}
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TestStackedBarGraph;
import React, { useRef, useEffect, useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
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

const TestStackedBarGraph = ({ data, title, keys, handleFilter }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse wheel horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag-to-scroll support
  useEffect(() => {
    const container = scrollRef.current;
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
      const walk = (x - startX) * 1.5; // scroll speed
      container.scrollLeft = scrollLeft - walk;
    };

    const stopDragging = () => setIsDragging(false);

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", stopDragging);
    container.addEventListener("mouseleave", stopDragging);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", stopDragging);
      container.removeEventListener("mouseleave", stopDragging);
    };
  }, [isDragging, startX, scrollLeft]);

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "240px",
            fontSize: "16px",
          }}
        >
          No Data Found
        </div>
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
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff8042",
      "#a83279",
      "#00C49F",
      "#FFBB28",
    ];
    return colors[index % colors.length];
  };

  const chartWidth = Math.max(transformedData.length * 60, 400);

  return (
    <div className="card g-4">
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

      {/* <div
        ref={scrollRef}
        style={{
          overflowX: "auto",
          height: "240px",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <div style={{ minWidth: chartWidth }}>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={transformedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis allowDecimals={false} fontSize={10} />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
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
          </ResponsiveContainer>
        </div>
      </div> */}
      <div
  ref={scrollRef}
  style={{
    overflowX: "auto",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    WebkitUserSelect: "none",
    scrollbarWidth:'none',
    height: "240px",
  }}
>
  <div style={{ width: `${Math.max(transformedData.length * 80, 500)}px` }}>
    <BarChart
      width={Math.max(transformedData.length * 80, 500)}
      height={240}
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
{/* <div className="legend-wrapper"> */}
  <div style={{  position: "sticky",
                        background: "#fff",
                        display: "flex",
                        gap: "16px",
                        padding: '5px',
                        fontSize: "12px",
                        zIndex: 2,
                        marginLeft: '15%',
                        marginRight: '10%',}}>
    {barKeys.map((key, index) => (
      <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: getBarColor(index),
            borderRadius: 2,
          }}
        />
        <span>{key}</span>
      </div>
    ))}
  </div>
{/* </div> */}
    </div>
  );
};

export default TestStackedBarGraph;
