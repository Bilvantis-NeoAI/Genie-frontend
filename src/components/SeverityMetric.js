import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import BarGraph from "../graphs/BarGraph";
import PieGraph from "../graphs/PieGraph";
import HeatGraph from "../graphs/HeatGraph";
import AreaGraph from "../graphs/AreaGraph";
import { DatePicker } from 'antd';
import 'antd/dist/reset.css';
const { RangePicker } = DatePicker;

// import DatePicker from "react-multi-date-picker";
export default function SeverityMetric() {
    const [offCanvas, setOffCanvas] = useState(false);
    const [filters, setFilters] = useState([{
        name: ''
    }]);
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
        console.log("*** from handle submit=====++++", selectedFilter);
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilter({ ...selectedFilter, [name]: value });
        console.log("+++setSelectedFilter ***********", selectedFilter);

    }
    console.log("+++selectedFilterselectedFilterselectedFilter", selectedFilter);

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
                { count: 100, percentage: 54 },
                { count: 150, percentage: 67 },
                { count: 80, percentage: 32 },
                { count: 200, percentage: 10 },
            ],
            filters: ["Admin", "developer", "tester"],
        },
        {
            type: "Heat",
            data: [
                { count: 100, percentage: 45 },
                { count: 150, percentage: 36 },
                { count: 80, percentage: 36 },
                { count: 200, percentage: 24 },
            ],
            filters: ["Admin", "developer", "tester"],
        },
        {
            type: "Frequency",
            data: [
                { name: "admin", count: 10, percentage: 40 },
                { name: "Develo", count: 150, percentage: 10 },
                { name: "medium", count: 80, percentage: 32 },
                { name: "severity", count: 200, percentage: 80 },
                { name: "normal", count: 200, percentage: 80 },
                { name: "sevef", count: 100, percentage: 80 }
            ],
            filters: ["Admin", "developer", "tester"],
        }
    ];

    const graphComponents = {
        Quality: BarGraph,
        Severity: PieGraph,
        Users: BarGraph,
        Heat: HeatGraph,
        Frequency: AreaGraph,
    };
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
