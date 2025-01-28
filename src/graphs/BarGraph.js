import React from "react";
import { XAXISKEYS, DATAKEY, TITLE, XAXISNAMES, CANVASKEY } from '../utils/constatnts'
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
const BarGraph = ({ data, title, keys, handleFilter, from }) => {
    const formatName = (name) =>
        name
            ? name
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            : '';

    if (from === CANVASKEY.ASSISTANCE || from === CANVASKEY.REVIEW) {
        const nameKey = from === CANVASKEY.ASSISTANCE ? XAXISKEYS.ASSISTANCE : XAXISKEYS.REVIEW;
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
        xAxisDataKey !== XAXISKEYS.SEVERITY && xAxisDataKey !== XAXISKEYS.MONTH ? "150%" : "100%";

    return (
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
                        >
                            <FilterOutlined />
                        </button>
                    </div>
                </div>
            </div>
            <div style={scrollStyle}>
                <ResponsiveContainer width={containerWidth} height={240}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30 }}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey={xAxisDataKey} fontSize={10} tick={{ angle: 0 }} interval={0} />
                        <YAxis fontSize={10} />
                        <Tooltip cursor={{ fill: "transparent" }} />
                        <Legend />
                        {xAxisDataKey !== XAXISKEYS.MONTH && (
                            <Bar dataKey={DATAKEY.COUNT} fill="#1DB9EF" barSize={20} name={XAXISNAMES.COUNT} />
                        )}
                        {from === XAXISKEYS.SEVERITY && (
                            <Bar dataKey={DATAKEY.PERCENTAGE} fill="#1DEF81" barSize={20} name={XAXISNAMES.PERCENTAGE} />
                        )}
                        {xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_QUALITY && (
                            <Bar dataKey={DATAKEY.AVARAGE_QUALITY} fill="#1DEF81" name={XAXISNAMES.AVARAGE_QUALITY} barSize={20} />
                        )}
                        {xAxisDataKey === XAXISKEYS.MONTH && title === TITLE.AVARAGE_CODE_SEVERITY && (
                            <Bar dataKey={DATAKEY.AVARAGE_SEVERITY} fill="#1DEF81" name={XAXISNAMES.AVARAGE_SEVERITY} barSize={20} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default BarGraph;