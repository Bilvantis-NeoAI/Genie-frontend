import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraphList } from "../actions/graphsDataActions";
import BarGraph from "../graph/BarGraph";
import PieGraph from "../graph/PieGraph";
import AreaGraph from "../graph/AreaGraph";
import MuilBarGraph from "../graph/MultiBarGraph";
import CountGraph from "../graph/CountGraphs";
import "react-datepicker/dist/react-datepicker.css";
import OffCanvas from "./OffCanvas";
const FullScreenLoader = () => (
    <div className="loader-overlay">
        <div className="spinner-border text-white" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);
export default function SeverityMetric() {
    const [offCanvas, setOffCanvas] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({ project_name: "" });
    const [moduleType, setModuleType] = useState("severity");
    const [loading, setLoading] = useState(false);
    const data = useSelector((state) => state.graphs[moduleType]?.data);
    const dispatch = useDispatch();

    const handleFilter = (filterValues, graphTitle, graphKey) => {
        setSelectedFilter((prevFilter) => ({
            ...prevFilter,
            initiatedBy: graphTitle,
            key: graphKey
        }));
        setOffCanvas(true);
    };

    const onClear = () => {
        setSelectedFilter((prevState) => ({
            ...prevState,
            project_name: "",
            user_id: "",
            _id: "",
            date: ""
        }));
        setUsers([]);
    };

    const handleReset = () => {
        setSelectedFilter((prevState) => ({
            ...prevState,
            project_name: "",
            user_id: "",
            _id: "",
            date: ""
        }));
        setUsers([]);
        const filters = {};
        if (selectedFilter.key === "issue_severity_distribution") {
            filters.project_name = "";
        } else if (selectedFilter.key === "issue_severity_frequency_by_project") {
            filters.month = "";
        } else {
            filters.project_name = "";
            filters.user_id = "";
        }
        const filtersString = JSON.stringify(filters);
        const params = {
            type: moduleType,
            filter: true,
            metric_name: selectedFilter.key,
            filters: filtersString
        };
        dispatch(fetchGraphList(params, moduleType));
        setOffCanvas(false);
    };

    const handleProjectChange = (projectId) => {
        let selectedProject = data?.project_user_mapping?.find(
            (project) => project._id === projectId
        );
        setUsers(selectedProject?.users || []);
        if (selectedProject) {
            setSelectedFilter((prevFilter) => ({
                ...prevFilter,
                project_name: selectedProject.project_name
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filters = {};
        if (selectedFilter.key === "issue_severity_distribution") {
            filters.project_name = selectedFilter.project_name;
        } else if (selectedFilter.key === "issue_severity_frequency_by_project") {
            filters.month = selectedFilter.date;
        } else {
            filters.project_name = selectedFilter.project_name;
            filters.user_id = selectedFilter.user_id;
        }
        const filtersString = JSON.stringify(filters);
        const params = {
            type: moduleType,
            filter: true,
            metric_name: selectedFilter.key,
            filters: filtersString
        };
        dispatch(fetchGraphList(params, moduleType));
        
        setOffCanvas(false);
        setSelectedFilter((prevState) => ({
            ...prevState,
            project_name: "",
            user_id: "",
            _id: "",
            date: ""
        }));
        setUsers([])
    };

    const handleCloseCanvas = () => {
        setOffCanvas(false);
        setSelectedFilter({});
    };

    const onChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setSelectedFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
        }
    };

    const handleDateChange = (date) => {
        if (date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const formattedDate = `${year}-${month.toString().padStart(2, "0")}`;
            setSelectedFilter((prevFilter) => ({
                ...prevFilter,
                date: formattedDate
            }));
        }
    };

    const graphComponents = {
        double_bar_graph: BarGraph,
        pie: PieGraph,
        area_chart: AreaGraph,
        bar: MuilBarGraph,
        bar_graph: CountGraph
    };

    let metrics = [];
    if (data) {
        for (let key in data) {
            let innerObject = data[key];
            if (innerObject && typeof innerObject === "object") {
                innerObject["key"] = key;
            }
        }
        metrics = Object.values(data);
    }

    useEffect(() => {
        setLoading(true);
        const params = { type: moduleType, filter: false };
        dispatch(fetchGraphList(params, moduleType)).finally(() => {
            setLoading(false); // End loading
        });
    }, [dispatch, moduleType]);

    return (
        <>
            {loading && <FullScreenLoader />} {/* Display the loader while loading */}
            <div className="row g-2">
                {!loading ? (
                    metrics?.map((metric, index) => {
                        const GraphComponent = graphComponents[metric?.graph_type] || null;
                        return (
                            <div className="col-lg-6 col-md-12" key={index}>
                                {GraphComponent && (
                                    <GraphComponent
                                        data={metric.data}
                                        title={metric.title}
                                        key={metric.key}
                                        from={moduleType}
                                        handleFilter={(filterValues) => handleFilter(filterValues, metric.title, metric.key)}
                                    />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="col-12 text-center">Loading...</div>
                )}
            </div>
            <OffCanvas
                isVisible={offCanvas}
                onClose={handleCloseCanvas}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
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
