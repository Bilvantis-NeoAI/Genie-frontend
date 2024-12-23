import React from "react";
import { ResponsiveContainer, Tooltip, Cell } from "recharts";
import { ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Scatter } from "recharts";
import {
    FilterOutlined
  } from "@ant-design/icons";
const HeatGraph = ({ data, title, handleFilter }) => {
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
            <h6 style={{marginTop:'-4%'}}>
            {title} Heatmap
                </h6>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button type="button" className="btn btn-light" onClick={handleFilter} data-bs-toggle="offcanvas"
                    data-bs-target="#addPriority"
                    aria-controls="offcanvasRight">
                    <FilterOutlined />
                </button>
                </div>
            </div>
            <ResponsiveContainer width="80%" height={240}>
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="count" type="number" name="X Axis" />
                    <YAxis dataKey="percentage" type="number" name="Y Axis" />
                    <ZAxis dataKey="value" range={[50, 500]} />
                    <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        formatter={(value) => `Value: ${value}`}
                    />
                    <Scatter
                        name="Heatmap Data"
                        data={data}
                        fill="red"
                        shape="circle"
                    >
                        {/* {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                // fill={`red, ${entry.value})`}
                            />
                        ))} */}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HeatGraph;