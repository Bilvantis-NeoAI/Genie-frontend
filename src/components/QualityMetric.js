import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/reset.css";
import BarGraph from "../graphs/BarGraph";
import PieGraph from "../graphs/PieGraph";
import HeatGraph from "../graphs/HeatGraph";
import AreaGraph from "../graphs/AreaGraph";
import MuilBarGraph from "../graphs/MultiBarGraph";
import { fetchGraphList } from "../actions/graphsDataActions";
const { RangePicker } = DatePicker;

export default function QualityMetric() {
    const [offCanvas, setOffCanvas] = useState(false);
    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({});
    const dispatch = useDispatch();
    const data = useSelector((state) => state.graphs.quality);
    const handleFilter = (filterValues) => {
        setFilters(filterValues || []);
        setOffCanvas(true);
    };

    const handleCloseCanvas = () => {
        setOffCanvas(false);
        setFilters([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOffCanvas(false);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilter({ ...selectedFilter, [name]: value });
    };

    const graphComponents = {
        bar: BarGraph,
        pie: PieGraph,
        area_chart: AreaGraph,
        multi_bar: MuilBarGraph,
    };
    let metrics = [];
    if (data && data?.data?.metrics) {
        metrics = Object.values(data?.data?.metrics);
    }

    useEffect(() => {
        let params = {};
        params.type = "quality";
        params.filter = false;
        dispatch(fetchGraphList(params, 'quality'))
    }, [dispatch]);

    return (
        <>
            <div className="row g-4">
                {metrics.map((metric, index) => {
                    const titleToFromMapping = {
                        "Average Code Quality": "AverageQuality",
                        "Average Code Severity": "AverageSeverity",
                    };
                    const from = titleToFromMapping[metric.title] || "Default";
                    const GraphComponent = graphComponents[metric.graph_type] || null;
                    return (
                        <div className="col-lg-6 col-md-12" key={index}>
                            {GraphComponent && (
                                <GraphComponent
                                    data={metric.data}
                                    title={metric.title}
                                    from={from}
                                    handleFilter={() => handleFilter([])}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {offCanvas && (
                <div
                    className="offcanvas offcanvas-end show"
                    tabIndex="-1"
                    id="addPriority"
                    aria-labelledby="offcanvasRightLabel"
                    style={{ zIndex: 1050 }}
                >
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" onClick={handleCloseCanvas}></button>
                    </div>
                    <div className="offcanvas-body">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="filterSelect">Select Filter:</label>
                            <select
                                id="filterSelect"
                                value={selectedFilter.filter || ""}
                                name="filter"
                                onChange={onChange}
                                style={{ height: "30px", width: "80%", borderRadius: "3px" }}
                            >
                                <option value="">-- Select a Filter --</option>
                                {filters.map((filter, index) => (
                                    <option key={index} value={filter}>
                                        {filter}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <label htmlFor="dateRange">Select Date Range:</label>
                            <br />
                            <RangePicker
                                id="dateRange"
                                style={{ width: "80%" }}
                                getPopupContainer={(trigger) => trigger.parentElement}
                                dropdownClassName="custom-range-picker-popup"
                                onChange={(dates, dateStrings) => {
                                    onChange({
                                        target: {
                                            name: "dateRange",
                                            value: dateStrings,
                                        },
                                    });
                                }}
                                allowClear={true}
                                format="DD-MM-YYYY"
                            />
                            <br />
                            <button type="submit" className="mt-3 btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
