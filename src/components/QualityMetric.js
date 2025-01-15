import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/reset.css";
import LineGraph from "../graph/LineGraph";
import { fetchGraphList } from "../actions/graphsDataActions";
import OffCanvas from "./OffCanvas";

export default function QualityMetric() {
    const [offCanvas, setOffCanvas] = useState(false);
    const [filters, setFilters] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({});
    const dispatch = useDispatch();
    const [moduleType, setModuleType] = useState("quality");
    const data = useSelector((state) => state.graphs[moduleType]?.data);
    const handleFilter = (filterValues, graphTitle, graphKey) => {
        setSelectedFilter((prevFilter) => ({
            ...prevFilter,
            initiatedBy: graphTitle,
            key: graphKey
        }));
        setOffCanvas(true);
    };

    const handleCloseCanvas = () => {
        setOffCanvas(false);
        setFilters([]);
    };
    const onClear = () => {
        setSelectedFilter((prevState) => {
            const updatedState = {
                ...prevState,
                project_name: "",
                user_id: "",
                date: "",
            };
            return updatedState;
        });
    
        setUsers([]);
    };
    const handleReset = () => {
        setSelectedFilter((prevState) => {
            const updatedState = {
                ...prevState,
                project_name: "",
                user_id: '',
                _id: "",
                date: ''
            };
            return updatedState;
        });
        setUsers([]);
        const filters = {};
        if (selectedFilter.key === "issue_severity_distribution") {
            filters.project_name = ""
        } else if (selectedFilter.key === "issue_severity_frequency_by_project") {
            filters.month = ""
        } else {
            filters.project_name = ""
            filters.user_id = ""
        }
        const filtersString = JSON.stringify(filters);
        const params = {
            type: moduleType,
            filter: true,
            metric_name: selectedFilter.key,
            filters: filtersString,
        };
        dispatch(fetchGraphList(params, moduleType));
        setOffCanvas(false);
    };
    const handleProjectChange = (projectId) => {
        const selectedProject = data?.project_user_mapping?.find(
            (project) => project._id === projectId
        );
        setUsers(selectedProject?.users || []);
        if (selectedProject) {
            setSelectedFilter((prevFilter) => ({
                ...prevFilter,
                project_name: selectedProject.project_name,
            }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const filters = {
            project_name: selectedFilter.project_name,
            user_id:selectedFilter.user_id,
            month: selectedFilter.date
        };
        const filtersString = JSON.stringify(filters);
        const params = {
            type: moduleType,
            filter: true,
            metric_name: selectedFilter.key,
            filters: filtersString,
        };
        dispatch(fetchGraphList(params, moduleType));
        setOffCanvas(false);
    };
    const handleDateChange = (date) => {
        if (date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
            setSelectedFilter((prevFilter) => ({
                ...prevFilter,
                date: formattedDate,
            }));
        }
    };
    const onChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setSelectedFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
        }
    };

    const graphComponents = {
        line:LineGraph
    };
    let metrics = [];
    if (data) {
        for (let key in data) {
            let innerObject = data[key];
            // Ensure the innerObject is not null and is an object
            if (innerObject && typeof innerObject === "object") {
                innerObject["key"] = key;
                metrics.push(innerObject); // Add to metrics only if it's valid
            }
        }
    }

    useEffect(() => {
        const params = { type: moduleType, filter: false };
        dispatch(fetchGraphList(params, moduleType));
    }, [dispatch, moduleType]);

    return (
        <>
            <div className="row g-2">
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
                                    key={metric.key}
                                    handleFilter={() => handleFilter(metric?.filters ,metric?.title, metric?.key)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            <OffCanvas
                isVisible={offCanvas}
                onClose={handleCloseCanvas}
                selectedFilter={selectedFilter}
                users={users}
                data={data}
                handleProjectChange={handleProjectChange}
                onChange={onChange}
                handleSubmit={handleSubmit}
                handleDateChange={handleDateChange}
                onClear={onClear} 
                handleReset={handleReset} 
            />
        </>
    );
}
