import React, { useState, useEffect } from "react";
import BarGraph from "../graphs/BarGraph";
import PieGraph from "../graphs/PieGraph";
import AreaGraph from "../graphs/AreaGraph";
import HorizontalGraph from "../graphs/HorizotalGraph";
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
const { RangePicker } = DatePicker;
export default function QualityMetric() {
    const [offCanvas, setOffCanvas] = useState(false);
    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
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
        setOffCanvas(false)
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilter({ ...selectedFilter, [name]: value });
    }
    const sampledata = [
        {
            type: "Quality",
            data: [
                { name: "low", count: 100, percentage: 40 },
                { name: "critical", count: 150, percentage: 60 },
                { name: "medium", count: 80, percentage: 32 },
                { name: "severity", count: 200, percentage: 80 },
            ],
            filters: ["alpha", "beta"],
        },
        {
            type: "Severity",
            data: [
                { name: "low", count: 100, percentage: 40 },
                { name: "critical", count: 150, percentage: 60 },
                { name: "medium", count: 80, percentage: 32 },
                { name: "severity", count: 200, percentage: 80 },
            ],
            filters: ["low", "medium", "high"],
        },
        {
            type: "Users",
            data: [
                { count: 100, percentage: 40 },
                { count: 150, percentage: 60 },
                { count: 80, percentage: 32 },
                { count: 200, percentage: 80 },
            ],
            filters: ["Admin", "developer", "tester"],
        },
        {
            type: "Frequency",
            data: [
                { name: "admin", count: 100, percentage: 40 },
                { name: "Developer", count: 150, percentage: 60 },
                { name: "medium", count: 80, percentage: 32 },
                { name: "severity", count: 200, percentage: 80 },
            ],
            filters: ["Admin", "developer", "tester"],
        }
    ];

    const graphComponents = {
        Quality: BarGraph,
        Severity: PieGraph,
        Users: BarGraph,
        Frequency: AreaGraph
        };

    useEffect(() => {
        console.log("OffCanvas state updated:", offCanvas);
    }, [offCanvas]);

    return (
        <>
            <div className="row g-4">
                {sampledata.map((dataset, index) => {
                    const GraphComponent = graphComponents[dataset.type] || null;
                    return (
                        <div className="col-lg-6 col-md-12" key={index}>
                            {GraphComponent && (
                                <GraphComponent
                                    data={dataset.data}
                                    title={dataset.type}
                                    handleFilter={() => handleFilter(dataset.filters)}
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
                                value={selectedFilter.filter}
                                name="filter"
                                onChange={onChange}
                                style={{ height: '30px', width: '80%', borderRadius: '3px' }}
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
                                style={{ width: '80%' }}
                                getPopupContainer={(trigger) => trigger.parentElement}
                                dropdownClassName="custom-range-picker-popup" 
                                onChange={(dates, dateStrings) => {
                                    console.log(dates, dateStrings);
                                    onChange({
                                        target: {
                                            name: 'dateRange',
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
