import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MultiStackedBarChart = ({ data }) => {
  // Transform the data for the chart
  const transformedData = data.project.map((project) => ({
    name: project.project_name,
    sec: parseInt(project.metrics.sec),
    dsaf: parseInt(project.metrics.dsaf),
    sad: parseInt(project.metrics.sad),
    issues_closed: parseInt(project.issues.colsed),
    issues_open: parseInt(project.issues.open),
    users: parseInt(project.users),
    commits: parseInt(project.commits),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={transformedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Metrics Stack */}
        <Bar dataKey="sec" stackId="Metrics" fill="#8884d8" barSize={20}/>
        <Bar dataKey="dsaf" stackId="Metrics" fill="#82ca9d" barSize={20}/>
        <Bar dataKey="sad" stackId="Metrics" fill="#ffc658" barSize={20}/>
        {/* Issues Stack */}
        <Bar dataKey="issues_closed" stackId="Issues" fill="#ff8042"barSize={20} />
        <Bar dataKey="issues_open" stackId="Issues" fill="#8dd1e1" barSize={20}/>
        {/* Users and Commits */}
        <Bar dataKey="users" stackId="Users" fill="#a4de6c" barSize={20}/>
        <Bar dataKey="commits" stackId="commits" fill="#d0ed57" barSize={20}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MultiStackedBarChart;