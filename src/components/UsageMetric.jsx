import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraphList } from "../actions/graphsDataActions";
import "antd/dist/reset.css";
import BarGraph from "../graphs/BarGraph";
import StackedBarGraph from "../graphs/StackedBarGraph";
import OffCanvas from "./OffCanvas";
export default function UsageMetric() {
  const [offCanvas, setOffCanvas] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});
  const dispatch = useDispatch();
  const moduleType = "usage";
  const data = useSelector((state) => state.graphs[moduleType]?.data);
  const handleFilter = (filterValues, graphTitle, graphKey) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      initiatedBy: graphTitle,
      key: graphKey,
    }));
    setOffCanvas(true);
  };
  const handleCloseCanvas = () => {
    setSelectedFilter((prev) => ({
      ...prev,
      date: null,
    }));
    setOffCanvas(false);
  };
  const handleDateChange = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}`;
      setSelectedFilter((prevFilter) => ({
        ...prevFilter,
        date: formattedDate,
      }));
    }
  };
  const handleReset = () => {
    const savedUserId = sessionStorage.getItem("user_id") || null;
    setSelectedFilter((prevState) => ({
      ...prevState,
      project_name: null,
      user_id: savedUserId,
      _id: null,
      date: null,
    }));
    setUsers([]);
    const params = {
      type: moduleType,
      filter: false,
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
    const savedUserId = sessionStorage.getItem("user_id") || null;
    e.preventDefault();

    const filters = {
      project_name: selectedFilter.project_name,
      user_id: selectedFilter.user_id || savedUserId,
      month: selectedFilter.date,
    };
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
        project_name: "",
        user_id: "",
        _id: "",
        date: "",
      };
      return updatedState;
    });
    setOffCanvas(false);
  };
  const onChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setSelectedFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    }
  };
  const graphComponents = {
    bar: BarGraph,
    stacked_bar: StackedBarGraph,
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
  useEffect(() => {
    const params = { type: moduleType, filter: false };
    dispatch(fetchGraphList(params, moduleType));
  }, [dispatch, moduleType]);
  return (
    <>
      <div className="row g-1">
        {metrics?.map((metric, index) => {
          const titleToFromMapping = {
            "Review Usage Data": "Review",
            "Assistant Usage Data": "Assistant",
            "Application Usage": "Application",
          };
          const from = titleToFromMapping[metric?.title];
          const GraphComponent = graphComponents[metric?.graph_type] || null;
          return (
            <div className="col-lg-6 col-md-12" key={index}>
              {GraphComponent && (
                <GraphComponent
                  data={metric.data}
                  title={metric.title}
                  key={metric.key}
                  from={from}
                  handleFilter={() =>
                    handleFilter(metric?.filters, metric?.title, metric?.key)
                  }
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
        handleReset={handleReset}
      />
    </>
  );
}
