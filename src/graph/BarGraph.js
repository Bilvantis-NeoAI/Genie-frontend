
// import React from "react";
// import {
//   XAXISKEYS,
//   DATAKEY,
//   TITLE,
//   XAXISNAMES,
//   CANVASKEY,
// } from "../utils/constatnts";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import { FilterOutlined } from "@ant-design/icons";

// const BarGraph = ({ data, title, keys, handleFilter, from }) => {
//     const scrollContainerRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const formatName = (name) =>
//     name
//       ? name
//           .split("_")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ")
//       : "";

//   if (from === CANVASKEY.ASSISTANCE || from === CANVASKEY.REVIEW) {
//     const nameKey =
//       from === CANVASKEY.ASSISTANCE
//         ? XAXISKEYS.ASSISTANCE
//         : XAXISKEYS.REVIEW;
//     data = data?.map((item) => ({
//       ...item,
//       [nameKey]: formatName(item[nameKey]),
//     }));
//   }

//   const xAxisKeyMapping = {
//     Review: XAXISKEYS.REVIEW,
//     Assistant: XAXISKEYS.ASSISTANCE,
//     severity: XAXISKEYS.SEVERITY,
//     Application: XAXISKEYS.APPLICATION,
//     AverageQuality: XAXISKEYS.MONTH,
//     AverageSeverity: XAXISKEYS.MONTH,
//   };

//   const xAxisDataKey = xAxisKeyMapping[from];

//   const scrollStyle =
//     xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
//       ? { overflowX: "auto", scrollbarWidth: "none" }
//       : {};

//   const containerWidth =
//     xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
//       ? "200%"
//       : "100%";

//   return (
//     <div className="card g-4">
//       <div className="graph-title">
//         <div>{title}</div>
//         <div>
//           <button
//             type="button"
//             className="btn btn-light"
//             onClick={() => handleFilter(data, title, keys)}
//             data-bs-toggle="offcanvas"
//             data-bs-target="#addPriority"
//             aria-controls="offcanvasRight"
//             data-testid="filter-button"
//           >
//             <FilterOutlined />
//           </button>
//         </div>
//       </div>

//       <div
//         style={{
//           overflowX: "auto",
//           scrollbarWidth: "none",
//           height: "200px",
//           position: "relative",
//         }}
//       >
//         {data.length === 0 ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//               fontSize: "16px",
//             }}
//           >
//             No Data Found
//           </div>
//         ) : (
//           <div style={scrollStyle}>
//             <ResponsiveContainer width={containerWidth} height={200}>
//               <BarChart
//                 data={data}
//                 margin={{ top: 20, right: 30 }}
//                 barCategoryGap="20%"
//               >
//                 <CartesianGrid strokeDasharray="2 2" />
//                 <XAxis
//                   dataKey={xAxisDataKey}
//                   fontSize={9}
//                   tick={{ angle: 0 }}
//                   interval={0}
//                 />
//                 <YAxis fontSize={10} />
//                 <Tooltip cursor={{ fill: "transparent" }} />

//                 {xAxisDataKey !== XAXISKEYS.MONTH && (
//                   <Bar
//                     dataKey={DATAKEY.COUNT}
//                     fill="#1DB9EF"
//                     barSize={20}
//                     name={XAXISNAMES.COUNT}
//                   />
//                 )}
//                 {from === XAXISKEYS.SEVERITY && (
//                   <Bar
//                     dataKey={DATAKEY.PERCENTAGE}
//                     fill="#1DEF81"
//                     barSize={20}
//                     name={XAXISNAMES.PERCENTAGE}
//                   />
//                 )}
//                 {xAxisDataKey === XAXISKEYS.MONTH &&
//                   title === TITLE.AVARAGE_CODE_QUALITY && (
//                     <Bar
//                       dataKey={DATAKEY.AVARAGE_QUALITY}
//                       fill="#1DEF81"
//                       name={XAXISNAMES.AVARAGE_QUALITY}
//                       barSize={20}
//                     />
//                   )}
//                 {xAxisDataKey === XAXISKEYS.MONTH &&
//                   title === TITLE.AVARAGE_CODE_SEVERITY && (
//                     <Bar
//                       dataKey={DATAKEY.AVARAGE_SEVERITY}
//                       fill="#1DEF81"
//                       name={XAXISNAMES.AVARAGE_SEVERITY}
//                       barSize={20}
//                     />
//                   )}
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//       {data.length > 0 && (
//         <div
//           style={{
//             position: "sticky",
//             background: "#fff",
//             display: "flex",
//             gap: "16px",
//             fontSize: "12px",
//             zIndex: 2,
//             padding:'5px',
//             marginLeft:'45%',
//             marginRight:'10%'
//           }}
//         >
//           {xAxisDataKey !== XAXISKEYS.MONTH && (
//             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//               <div
//                 style={{ width: 12, height: 12, backgroundColor: "#1DB9EF" }}
//               ></div>
//               <span>{XAXISNAMES.COUNT}</span>
//             </div>
//           )}
//           {from === XAXISKEYS.SEVERITY && (
//             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//               <div
//                 style={{ width: 12, height: 12, backgroundColor: "#1DEF81" }}
//               ></div>
//               <span>{XAXISNAMES.PERCENTAGE}</span>
//             </div>
//           )}
//           {xAxisDataKey === XAXISKEYS.MONTH &&
//             title === TITLE.AVARAGE_CODE_QUALITY && (
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: 12,
//                     height: 12,
//                     backgroundColor: "#1DEF81",
//                   }}
//                 ></div>
//                 <span>{XAXISNAMES.AVARAGE_QUALITY}</span>
//               </div>
//             )}
//           {xAxisDataKey === XAXISKEYS.MONTH &&
//             title === TITLE.AVARAGE_CODE_SEVERITY && (
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: 12,
//                     height: 12,
//                     backgroundColor: "#1DEF81",
//                   }}
//                 ></div>
//                 <span>{XAXISNAMES.AVARAGE_SEVERITY}</span>
//               </div>
//             )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BarGraph;

import React, { useState, useRef, useEffect } from "react";
import {
  XAXISKEYS,
  DATAKEY,
  TITLE,
  XAXISNAMES,
  CANVASKEY,
} from "../utils/constatnts";
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

const BarGraph = ({ data, title, keys, handleFilter, from }) => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const formatName = (name) =>
    name
      ? name
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  if (from === CANVASKEY.ASSISTANCE || from === CANVASKEY.REVIEW) {
    const nameKey =
      from === CANVASKEY.ASSISTANCE
        ? XAXISKEYS.ASSISTANCE
        : XAXISKEYS.REVIEW;
    data = data?.map((item) => ({
      ...item,
      [nameKey]: formatName(item[nameKey]),
    }));
  }

  const xAxisKeyMapping = {
    Review: XAXISKEYS.REVIEW,
    Assistant: XAXISKEYS.ASSISTANCE,
    severity: XAXISKEYS.SEVERITY,
    Application: XAXISKEYS.APPLICATION,
    AverageQuality: XAXISKEYS.MONTH,
    AverageSeverity: XAXISKEYS.MONTH,
  };

  const xAxisDataKey = xAxisKeyMapping[from];

  const scrollStyle =
    xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
      ? { overflowX: "auto", scrollbarWidth: "none" }
      : {};

  const containerWidth =
    xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
      ? "200%"
      : "100%";

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - moveX;
  };

  // Mouse Up Handler to stop dragging
  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Adding the event listeners to enable dragging
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("mousedown", onMouseDown);
      scrollContainer.addEventListener("mousemove", onMouseMove);
      scrollContainer.addEventListener("mouseup", onMouseUp);
      scrollContainer.addEventListener("mouseleave", onMouseUp); // Ensures dragging stops if mouse leaves
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("mousedown", onMouseDown);
        scrollContainer.removeEventListener("mousemove", onMouseMove);
        scrollContainer.removeEventListener("mouseup", onMouseUp);
        scrollContainer.removeEventListener("mouseleave", onMouseUp);
      }
    };
  }, [isDragging, startX, scrollLeft]);

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

      <div
        ref={scrollContainerRef}
        style={{
          overflowX: "auto",
          scrollbarWidth: "none",
          height: "200px",
          position: "relative",
          cursor:'grab',// isDragging ? "grabbing" : "grab", // Change cursor on drag
          ...scrollStyle,
        }}
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
          <div style={{ width: "100%" }}>
            <ResponsiveContainer width={containerWidth} height={200}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30 }}
                barCategoryGap="20%"
              >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis
                  dataKey={xAxisDataKey}
                  fontSize={9}
                  tick={{ angle: 0 }}
                  interval={0}
                />
                <YAxis fontSize={10} />
                <Tooltip cursor={{ fill: "transparent" }} />

                {xAxisDataKey !== XAXISKEYS.MONTH && (
                  <Bar
                    dataKey={DATAKEY.COUNT}
                    fill="#1DB9EF"
                    barSize={20}
                    name={XAXISNAMES.COUNT}
                  />
                )}
                {from === XAXISKEYS.SEVERITY && (
                  <Bar
                    dataKey={DATAKEY.PERCENTAGE}
                    fill="#1DEF81"
                    barSize={20}
                    name={XAXISNAMES.PERCENTAGE}
                  />
                )}
                {xAxisDataKey === XAXISKEYS.MONTH &&
                  title === TITLE.AVARAGE_CODE_QUALITY && (
                    <Bar
                      dataKey={DATAKEY.AVARAGE_QUALITY}
                      fill="#1DEF81"
                      name={XAXISNAMES.AVARAGE_QUALITY}
                      barSize={20}
                    />
                  )}
                {xAxisDataKey === XAXISKEYS.MONTH &&
                  title === TITLE.AVARAGE_CODE_SEVERITY && (
                    <Bar
                      dataKey={DATAKEY.AVARAGE_SEVERITY}
                      fill="#1DEF81"
                      name={XAXISNAMES.AVARAGE_SEVERITY}
                      barSize={20}
                    />
                  )}
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
            fontSize: "12px",
            zIndex: 2,
            padding: "5px",
            marginLeft: "45%",
            marginRight: "10%",
          }}
        >
          {xAxisDataKey !== XAXISKEYS.MONTH && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div
                style={{ width: 12, height: 12, backgroundColor: "#1DB9EF" }}
              ></div>
              <span>{XAXISNAMES.COUNT}</span>
            </div>
          )}
          {from === XAXISKEYS.SEVERITY && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div
                style={{ width: 12, height: 12, backgroundColor: "#1DEF81" }}
              ></div>
              <span>{XAXISNAMES.PERCENTAGE}</span>
            </div>
          )}
          {xAxisDataKey === XAXISKEYS.MONTH &&
            title === TITLE.AVARAGE_CODE_QUALITY && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#1DEF81",
                  }}
                ></div>
                <span>{XAXISNAMES.AVARAGE_QUALITY}</span>
              </div>
            )}
          {xAxisDataKey === XAXISKEYS.MONTH &&
            title === TITLE.AVARAGE_CODE_SEVERITY && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: "#1DEF81",
                  }}
                ></div>
                <span>{XAXISNAMES.AVARAGE_SEVERITY}</span>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default BarGraph;


// import React, { useState, useRef } from "react";
// import {
//   XAXISKEYS,
//   DATAKEY,
//   TITLE,
//   XAXISNAMES,
//   CANVASKEY,
// } from "../utils/constatnts";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import { FilterOutlined } from "@ant-design/icons";

// const BarGraph = ({ data, title, keys, handleFilter, from }) => {
//   const scrollContainerRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);

//   const formatName = (name) =>
//     name
//       ? name
//           .split("_")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ")
//       : "";

//   if (from === CANVASKEY.ASSISTANCE || from === CANVASKEY.REVIEW) {
//     const nameKey =
//       from === CANVASKEY.ASSISTANCE
//         ? XAXISKEYS.ASSISTANCE
//         : XAXISKEYS.REVIEW;
//     data = data?.map((item) => ({
//       ...item,
//       [nameKey]: formatName(item[nameKey]),
//     }));
//   }

//   const xAxisKeyMapping = {
//     Review: XAXISKEYS.REVIEW,
//     Assistant: XAXISKEYS.ASSISTANCE,
//     severity: XAXISKEYS.SEVERITY,
//     Application: XAXISKEYS.APPLICATION,
//     AverageQuality: XAXISKEYS.MONTH,
//     AverageSeverity: XAXISKEYS.MONTH,
//   };

//   const xAxisDataKey = xAxisKeyMapping[from];

//   const scrollStyle =
//     xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
//       ? { overflowX: "auto", scrollbarWidth: "none" }
//       : {};

//   const containerWidth =
//     xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH
//       ? "200%"
//       : "100%";

//   // Mouse Down Handler for drag
//   const onMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.clientX);
//     setScrollLeft(scrollContainerRef.current.scrollLeft);
//   };

//   // Mouse Move Handler for drag
//   const onMouseMove = (e) => {
//     if (!isDragging) return;
//     const moveX = e.clientX - startX;
//     scrollContainerRef.current.scrollLeft = scrollLeft - moveX;
//   };

//   // Mouse Up Handler to stop dragging
//   const onMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Adding the event listeners to enable dragging
//   React.useEffect(() => {
//     const scrollContainer = scrollContainerRef.current;

//     if (scrollContainer) {
//       scrollContainer.addEventListener("mousedown", onMouseDown);
//       scrollContainer.addEventListener("mousemove", onMouseMove);
//       scrollContainer.addEventListener("mouseup", onMouseUp);
//       scrollContainer.addEventListener("mouseleave", onMouseUp); // Ensures dragging stops if mouse leaves
//     }

//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener("mousedown", onMouseDown);
//         scrollContainer.removeEventListener("mousemove", onMouseMove);
//         scrollContainer.removeEventListener("mouseup", onMouseUp);
//         scrollContainer.removeEventListener("mouseleave", onMouseUp);
//       }
//     };
//   }, [isDragging, startX, scrollLeft]);

//   return (
//     <div className="card g-4">
//       <div className="graph-title">
//         <div>{title}</div>
//         <div>
//           <button
//             type="button"
//             className="btn btn-light"
//             onClick={() => handleFilter(data, title, keys)}
//             data-bs-toggle="offcanvas"
//             data-bs-target="#addPriority"
//             aria-controls="offcanvasRight"
//             data-testid="filter-button"
//           >
//             <FilterOutlined />
//           </button>
//         </div>
//       </div>

//       <div
//         ref={scrollContainerRef}
//         style={{
//           overflowX: "auto",
//           scrollbarWidth: "none",
//           height: "200px",
//           position: "relative",
//           cursor: isDragging ? "grabbing" : "grab", // Change cursor on drag
//         }}
//       >
//         {data.length === 0 ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//               fontSize: "16px",
//             }}
//           >
//             No Data Found
//           </div>
//         ) : (
//           <div style={scrollStyle}>
//             <ResponsiveContainer width={containerWidth} height={200}>
//               <BarChart
//                 data={data}
//                 margin={{ top: 20, right: 30 }}
//                 barCategoryGap="20%"
//               >
//                 <CartesianGrid strokeDasharray="2 2" />
//                 <XAxis
//                   dataKey={xAxisDataKey}
//                   fontSize={9}
//                   tick={{ angle: 0 }}
//                   interval={0}
//                 />
//                 <YAxis fontSize={10} />
//                 <Tooltip cursor={{ fill: "transparent" }} />

//                 {xAxisDataKey !== XAXISKEYS.MONTH && (
//                   <Bar
//                     dataKey={DATAKEY.COUNT}
//                     fill="#1DB9EF"
//                     barSize={20}
//                     name={XAXISNAMES.COUNT}
//                   />
//                 )}
//                 {from === XAXISKEYS.SEVERITY && (
//                   <Bar
//                     dataKey={DATAKEY.PERCENTAGE}
//                     fill="#1DEF81"
//                     barSize={20}
//                     name={XAXISNAMES.PERCENTAGE}
//                   />
//                 )}
//                 {xAxisDataKey === XAXISKEYS.MONTH &&
//                   title === TITLE.AVARAGE_CODE_QUALITY && (
//                     <Bar
//                       dataKey={DATAKEY.AVARAGE_QUALITY}
//                       fill="#1DEF81"
//                       name={XAXISNAMES.AVARAGE_QUALITY}
//                       barSize={20}
//                     />
//                   )}
//                 {xAxisDataKey === XAXISKEYS.MONTH &&
//                   title === TITLE.AVARAGE_CODE_SEVERITY && (
//                     <Bar
//                       dataKey={DATAKEY.AVARAGE_SEVERITY}
//                       fill="#1DEF81"
//                       name={XAXISNAMES.AVARAGE_SEVERITY}
//                       barSize={20}
//                     />
//                   )}
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>

//       {data.length > 0 && (
//         <div
//           style={{
//             position: "sticky",
//             background: "#fff",
//             display: "flex",
//             gap: "16px",
//             fontSize: "12px",
//             zIndex: 2,
//             padding: "5px",
//             marginLeft: "45%",
//             marginRight: "10%",
//           }}
//         >
//           {xAxisDataKey !== XAXISKEYS.MONTH && (
//             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//               <div
//                 style={{ width: 12, height: 12, backgroundColor: "#1DB9EF" }}
//               ></div>
//               <span>{XAXISNAMES.COUNT}</span>
//             </div>
//           )}
//           {from === XAXISKEYS.SEVERITY && (
//             <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//               <div
//                 style={{ width: 12, height: 12, backgroundColor: "#1DEF81" }}
//               ></div>
//               <span>{XAXISNAMES.PERCENTAGE}</span>
//             </div>
//           )}
//           {xAxisDataKey === XAXISKEYS.MONTH &&
//             title === TITLE.AVARAGE_CODE_QUALITY && (
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: 12,
//                     height: 12,
//                     backgroundColor: "#1DEF81",
//                   }}
//                 ></div>
//                 <span>{XAXISNAMES.AVARAGE_QUALITY}</span>
//               </div>
//             )}
//           {xAxisDataKey === XAXISKEYS.MONTH &&
//             title === TITLE.AVARAGE_CODE_SEVERITY && (
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "4px" }}
//               >
//                 <div
//                   style={{
//                     width: 12,
//                     height: 12,
//                     backgroundColor: "#1DEF81",
//                   }}
//                 ></div>
//                 <span>{XAXISNAMES.AVARAGE_SEVERITY}</span>
//               </div>
//             )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BarGraph;
