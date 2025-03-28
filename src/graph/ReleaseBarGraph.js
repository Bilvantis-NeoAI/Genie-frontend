import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
const ReleaseBarGraph = ({ data, title, keys, handleFilter, from }) => {
    return (
        console.log("wefdasdfsafdfd",data),
       
        <div className="card g-4">
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
            <div style={{ overflowX: "auto", height: "240px", position: "relative" }}>
    {data.length === 0 ? (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "16px",
        }}>No Data Found</div>
    ) : (
        <div style={{ minWidth: `${data.length * 50}px` }}> {/* width grows with data */}
            <ResponsiveContainer width="100%" height={240}>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={10} tickFormatter={(date) => date.slice(5)}/>
                    <YAxis fontSize={10}/>
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Legend wrapperStyle={{ fontSize: 12 }}/>
                    <Bar dataKey="total_count" fill="#1DB9EF" name="Total Count" barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )}
</div>

        </div>
    );
};
export default ReleaseBarGraph;