import MultiStackedBarChart from "../graphs/MultiStackedGraph"

export default function CommitMetrics() {
    const data = {
        project: [
          {
            project_name: "Project A",
            metrics: {
              sec: "20",
              dsaf: "10",
              sad: "23",
            },
            issues: {
              colsed: "2",
              open: "10",
            },
            users: "2",
            commits: "23",
          },
          {
            project_name: "Project B",
            metrics: {
              sec: "20",
              dsaf: "10",
              sad: "23",
            },
            issues: {
              colsed: "2",
              open: "10",
            },
            users: "2",
            commits: "23",
          },
        ],
      };
      const graphComponents = {
        bar: MultiStackedBarChart,
    };
      
      
return (
    <>
    <div className="row g-2 ">
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
                                    handleFilter={() => handleFilter(metric?.filters, metric?.title, metric?.key)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
  <MultiStackedBarChart data ={ data}/>
  </>
)
}