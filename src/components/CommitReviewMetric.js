import OffCanvas from "./OffVanvas";
import LineGraph from "../graphs/LineGraph";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGraphList } from "../actions/graphsDataActions";
import MultiStackedGraph from "../graphs/MultiStackedGraph";
import DoubleBarGraph from "../graphs/DoubleBarGraph";
import { CANVASKEY } from '../utils/constatnts'
import React from "react";
export default function CommitReviewMetric() {
    const [offCanvas, setOffCanvas] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({});
    const moduleType = "commit"
    const [users, setUsers] = useState([]);
    const data = useSelector((state) => state.graphs[moduleType]?.data);
    const dispatch = useDispatch();
    useEffect(() => {
        const params = { type: moduleType, filter: false };
        dispatch(fetchGraphList(params, moduleType))
    }, [dispatch, moduleType]);
    const handleReset = () => {     
        setSelectedFilter((prevState) => {
            const updatedState = {
                ...prevState,
                reponame: "",
                user_id: '',
                _id: "",
                start_date: '',
                end_date: ''
            };
            return updatedState;
        });
        setUsers([]);
        const filters = {};
        filters.start_date = ""
        filters.end_date = ""
        filters.user_id = ""
        filters.reponame = ""
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
        let selectedProject = data?.project_user_mapping?.find(
            (project) => project._id === projectId
        );
        setUsers(selectedProject?.users || []);
        if (selectedProject) {
            setSelectedFilter((prevFilter) => {
                const updatedFilter = {
                    ...prevFilter,
                    project_name: selectedProject.project_name,
                };
                return updatedFilter;
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const filters = {};
        filters.start_date = selectedFilter.start_date
        filters.end_date = selectedFilter.end_date
        filters.user_id = selectedFilter.user_id
        // if (selectedFilter.key === GRAPHKEYS.COMMIT_AVARAGE_CODE_QUALITY) {
        //     filters.reponame = selectedFilter.project_name
        // }
        // else {
            filters.reponame = selectedFilter.project_name;
        // }
        const filtersString = JSON.stringify(filters);
        const params = {
            type: moduleType,
            filter: true,
            metric_name: selectedFilter.key,
            filters: filtersString,
        };
        dispatch(fetchGraphList(params, moduleType));
        setSelectedFilter((prevState) => {
            const updatedState = {
                ...prevState,
                reponame: "",
                user_id: '',
                _id: "",
                start_date: '',
                end_date: ''
            };
            return updatedState;
        });
        setOffCanvas(false);
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
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
            setSelectedFilter((prevFilter) => ({
                ...prevFilter,
                date: formattedDate,
            }));
        } else {
            setSelectedFilter((prevFilter) => ({
                ...prevFilter,
                date: "",
            }));
        }
    };
    let metrics = [];
    if (data) {
        for (let key in data) {
            let innerObject = data[key];
            if (innerObject && typeof innerObject === "object") {
                innerObject["key"] = key;
                metrics.push(innerObject);
            }
        }
    }
    const graphComponents = {
        line: LineGraph,
        stacked_bar_graph: MultiStackedGraph,
        double_bar_graph: DoubleBarGraph
    };

    const handleFilter = (filterValues, graphTitle, graphKey) => {
        setSelectedFilter((prevFilter) => ({
            ...prevFilter,
            initiatedBy: graphTitle,
            key: graphKey
        }));
        setOffCanvas(true);
    };
    return (
        <>
            <div className="row g-1 ">
                {
                    metrics?.map((metric, index) => {
                        const GraphComponent = graphComponents[metric?.graph_type] || null;
                        return (
                            <div className="col-lg-6 col-md-12" key={index}>
                                {GraphComponent && (
                                    <GraphComponent
                                        data={metric.data}
                                        title={metric.title}
                                        metricKey={metric.key}
                                        from={CANVASKEY.SEVERITY}
                                        handleFilter={(filterValues) => handleFilter(filterValues, metric.title, metric?.key)}
                                    />
                                )}
                            </div>
                        );
                    })
                }
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
                handleReset={handleReset}
            />
        </>
    )
}