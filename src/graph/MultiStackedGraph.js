import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import { FilterOutlined } from "@ant-design/icons";
const CustomTick = ({ x, y, payload }) => {
    const truncatedValue = payload.value.substring(0, 5);
    return (
        <text x={x} y={y + 10} textAnchor="middle" fontSize={10} fill="#666">
            {truncatedValue}
        </text>
    );
};
const handleMissingData = (value) => (value === null ? 0 : value);
const formatRepoName = (name) => {
    if (!name) return "";
    return name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};
const transformData = (data) => {
    if (!data || data.length === 0) {
        return [];
    }
    const allIssueKeys = new Set();
    const allRecentCommitKeys = new Set();
    const allCommitKeys = new Set();
    data?.forEach((item) => {
        if (item.total_issues) {
            Object.keys(item.total_issues).forEach((key) =>
                allIssueKeys.add(`total_issues_${key}`)
            );
        }
        if (item.recent_commit_issues) {
            Object.keys(item.recent_commit_issues).forEach((key) =>
                allRecentCommitKeys.add(`recent_commit_issues_${key}`)
            );
        }
        if (item.total_commits) {
            Object.keys(item.total_commits).forEach((key) =>
                allCommitKeys.add(`total_commits_${key}`)
            );
        }
    });
    return data
        .filter((item) => item.repo_name !== null)
        .map((item) => {
            const transformedItem = {
                repo_name: formatRepoName(item.repo_name),
            };
            Array.from(allIssueKeys).forEach((key) => {
                const originalKey = key.replace("total_issues_", "");
                transformedItem[key] = handleMissingData(
                    item.total_issues?.[originalKey]
                );
            });
            Array.from(allRecentCommitKeys).forEach((key) => {
                const originalKey = key.replace("recent_commit_issues_", "");
                transformedItem[key] = handleMissingData(
                    item.recent_commit_issues?.[originalKey]
                );
            });
            Array.from(allCommitKeys).forEach((key) => {
                const originalKey = key.replace("total_commits_", "");
                transformedItem[key] = handleMissingData(
                    item.total_commits?.[originalKey]
                );
            });

            return transformedItem;
        });
};
const getColor = (index) => {
    const colors = [
        "#8884d8",
        "#1DB9EF",
        "#82ca9d",
        "#ffc658",
        "#d0ed57",
        "#a4de6c",
        "#8dd1e1",
        "#83a6ed",
    ];
    return colors[index % colors.length];
};

const MultiStackedGraph = ({ data, title, handleFilter, keys }) => {
    const formattedData = transformData(data);
    if (formattedData.length !== 0) {
        var issueKeys = Object.keys(formattedData[0]).filter((key) =>
            key.startsWith("total_issues_")
        );
        var recentCommitKeys = Object.keys(formattedData[0]).filter((key) =>
            key.startsWith("recent_commit_issues_")
        );
        var commitKeys = Object.keys(formattedData[0]).filter((key) =>
            key.startsWith("total_commits_")
        );
    }
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const groupedData = {
                "Total Issues": [],
                "Recent Commit Issues": [],
                "Total Commits": [],
            };

            payload.forEach((entry) => {
                if (entry.dataKey.startsWith("total_issues_")) {
                    groupedData["Total Issues"].push({
                        name: entry.name,
                        value: entry.value,
                        color: entry.color,
                    });
                } else if (entry.dataKey.startsWith("recent_commit_issues_")) {
                    groupedData["Recent Commit Issues"].push({
                        name: entry.name,
                        value: entry.value,
                        color: entry.color,
                    });
                } else if (entry.dataKey.startsWith("total_commits_")) {
                    groupedData["Total Commits"].push({
                        name: entry.name,
                        value: entry.value,
                        color: entry.color,
                    });
                }
            });

            return (
                <div
                    className="multicoustomtool">
                    <p style={{ marginBottom: "10px", color: "#1DB9EF" }}>{`Repo Name: ${label}`}</p>
                    {Object.keys(groupedData).map((category) => (
                        <div key={category} style={{ marginBottom: "10px" }}>
                            <strong style={{ color: "#333" }}>{category}</strong>
                            <ul style={{ paddingLeft: "15px", margin: 0 }}>
                                {groupedData[category].map((item, index) => (
                                    <li key={`${category}-${index}`} style={{ color: item.color }}>
                                        {`${item.name}: ${item.value}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    };
    return (
        <div className="card g-4">
            <div>
                <div className="graph-title">
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
            <div
                style={{
                    overflowX: "auto",
                    overflowY: "hidden",
                    width: "100%",
                    height: "234px",
                    scrollbarWidth: "none",
                }}
            >
                {data.length !== 0 &&
                    <ResponsiveContainer width={Math.max(90 + formattedData.length * 10) + "%"} height="100%">
                        <BarChart
                            data={formattedData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barGap={3}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="repo_name" fontSize={10} tick={<CustomTick />} />
                            <YAxis fontSize={10} />
                            <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
                            {issueKeys.map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    barSize={20}
                                    stackId="stack1"
                                    fill={getColor(index)}
                                    name={key.replace("total_issues_", "").replace("_count", "")}
                                />
                            ))}
                            {recentCommitKeys.map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    barSize={20}
                                    stackId="stack2"
                                    fill={getColor(index + issueKeys.length)}
                                    name={key
                                        .replace("recent_commit_issues_", "")
                                        .replace("_count", "")}
                                />
                            ))}
                            {commitKeys.map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    barSize={20}
                                    stackId="stack3"
                                    fill={getColor(index + issueKeys.length + recentCommitKeys.length)}
                                    name={key.replace("total_commits_", "").replace("_commits", "")}
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                }
            </div>
        </div>
    );
};

export default MultiStackedGraph;