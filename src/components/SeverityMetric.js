import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import BarGraph from "../graphs/BarGraph";
import PieGraph from "../graphs/PieGraph";
import AreaGraph from "../graphs/AreaGraph";
import MuilBarGraph from "../graphs/MultiBarGraph";
import { fetchGraphList } from "../actions/graphsDataActions";

const { RangePicker } = DatePicker;

export default function SeverityMetric() {
    const [offCanvas, setOffCanvas] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({});
    const data = useSelector((state) => state.graphs.severity);
    const dispatch = useDispatch();

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
        if (!selectedFilter.projectId) {
            alert("Please select a project");
            return;
        }
        setOffCanvas(false);
        let params = {};
        params.type = "severity";
        params.filter = false;
        dispatch(fetchGraphList(params, 'severity'))
        dispatch(fetchGraphList({ projectId: selectedFilter.projectId }, 'severity'));
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilter({ ...selectedFilter, [name]: value });
    };


    const graphComponents = {
        double_bar_graph: BarGraph,
        pie: PieGraph,
        area_chart: AreaGraph,
        multi_bar: MuilBarGraph,
    };

    let metrics = [];
    if (data?.data && data?.data?.metrics) {
        metrics = Object.values(data?.data?.metrics);
    }
    useEffect(() => {
        let params = {};
        params.type = "severity";
        params.filter = false;
        dispatch(fetchGraphList(params, 'severity'))
    }, []);

    return (
        <>
            <div className="row g-4">
                {metrics?.map((metric, index) => {
                    const GraphComponent = graphComponents[metric.graph_type] || null;
                    return (
                        <div className="col-lg-6 col-md-12" key={index}>
                            {GraphComponent && (
                                <GraphComponent
                                    data={metric.data}
                                    title={metric.title}
                                    from="severity"
                                    handleFilter={() => handleFilter(metric.filters)}
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
                            <label htmlFor="filterSelect">Project Name:</label>
                            <select
                                id="filterSelect"
                                value={selectedFilter.projectId || ""}
                                name="projectId"
                                onChange={onChange}
                                style={{ height: "30px", width: "80%", borderRadius: "3px" }}
                            >
                                <option value="">-- Select a Project --</option>
                                {data?.data?.metrics?.project_user_mapping.map((project) => (
                                    <option key={project._id} value={project._id}>
                                        {project.project_name || "Unnamed Project"}
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
