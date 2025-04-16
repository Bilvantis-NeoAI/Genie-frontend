import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  
import { homePage3TextSamples } from "../utils/constatnts";
import { useDispatch, useSelector } from "react-redux";
import { fetchGitGraphList } from "../actions/gitGraphDataActions";

export default function GitMetrics() {
  const dispatch = useDispatch();
  const graphsData = useSelector((state) => state.gitGraph);
  const [barGraphXAxisData, setBarGraphXAxisData] = useState([]);
  const [barGraphData, setBarGraphData] = useState([]);
  const [retrivalGraphData, setRetrivalGraphData] = useState([]);
  const [retrivalGraphXAxisData, setRetrivalGraphXAxisData] = useState([]);

  // Fetch graph list on component mount
  useEffect(() => {
    dispatch(fetchGitGraphList());
  }, [dispatch]);

  // Process graphsData when it updates
  useEffect(() => {
    if (
      graphsData &&
      graphsData.graphData &&
      graphsData.graphData[1]?.length > 0
    ) {
      const data = graphsData.graphData[1];
      const BAR_GRAPH_X_AXIS_DATA = Object.keys(data[0]).filter(
        (key) => key !== "_id"
      );
      const BAR_GRAPH_DATA = Object.values(data[0]).filter(
        (value, index) => index !== 0
      );
      setBarGraphXAxisData(BAR_GRAPH_X_AXIS_DATA);
      setBarGraphData(BAR_GRAPH_DATA);
    }
    if (graphsData && graphsData.graphData && graphsData.graphData[3]) {
      const newData = graphsData.graphData[3];
      const NEW_GRAPH_X_AXIS_DATA = Object.keys(newData).filter(
        (key) => key !== "_id"
      );
      const NEW_GRAPH_DATA = Object.values(newData).filter(
        (value, index) => index !== 0
      );
      setRetrivalGraphXAxisData(NEW_GRAPH_X_AXIS_DATA);
      setRetrivalGraphData(NEW_GRAPH_DATA);
    }
  }, [graphsData]);

  return (
    <Container fluid className="w-100 pt-2">
      <div className="w-100">
        <div className="h-100 mb-5 pb-4">
          <div
            className="card d-flex h-100 question-card ms-4"
            style={{ overflowY: "scroll" }}
          >
            <div className="dasboard-container mt-3 container-fluid">
              <div className="top-charts-container row">
              <div className="col-12 col-md-6 mb-2">
  <div className="card card-container shadow">
    
    <ResponsiveContainer width="100%" height={300}>
    <ReBarChart
  data={barGraphXAxisData.map((label, idx) => ({ name: label, value: barGraphData[idx] }))}
  margin={{ top: 30, right: 30, left: 10, bottom: 0 }}
>
      <Legend
    layout="horizontal"
    verticalAlign="top"
    align="center" wrapperStyle={{ paddingBottom: 20 }} 
  />
     <XAxis dataKey="name" tickFormatter={(value) => value.length > 8 ? `${value.slice(0, 8)}...` : value  } style={{ fontSize: '12px' }}/>
     <YAxis   style={{ fontSize: '12px' }} />
        <Tooltip />
      
         
        <Bar
    dataKey="value"
    fill="#76cd26"
    name="Cummulative Retrival Metrics"
    radius={[10, 10, 0, 0]}
    barSize={20}  // Adjust the bar size (thickness) here
  />
      </ReBarChart>
    </ResponsiveContainer>
  </div>
</div>

<div className="col-12 col-md-6 mb-2">
  <div className="card card-container shadow">
    <ResponsiveContainer width="100%" height={300}>
    <ReBarChart
  data={retrivalGraphXAxisData.map((label, idx) => ({ name: label, value: retrivalGraphData[idx] }))}
  margin={{ top: 30, right: 30, left: 10, bottom: 0 }}
>

      <Legend
    layout="horizontal"
    verticalAlign="top"
    align="center" wrapperStyle={{ paddingBottom: 20 }} 
  />
        <XAxis dataKey="name" tickFormatter={(value) => value.length > 8 ? `${value.slice(0, 8)}...` : value  } style={{ fontSize: '12px' }}/>
        <YAxis   style={{ fontSize: '12px' }} />
        <Tooltip />
       
        <Bar
    dataKey="value"
    fill="#2196F3"
    name="Cummulative Retrival Metrics"
    radius={[10, 10, 0, 0]}
    barSize={20}  // Adjust the bar size (thickness) here
  />
      </ReBarChart>
    </ResponsiveContainer>
  </div>
</div>

              </div>

              <Table responsive className="mt-2 w-100">
                <thead className="w-100 table-heading">
                  <tr
                    className="table-header w-100"
                    style={{ fontSize: "0.75rem", textAlign: "center" }}
                  >
                    <th className="table-header" style={{ width: "10%" }}>
                      {homePage3TextSamples.DOCUMENT_NAME}
                    </th>
                    <th className="table-header">
                      {homePage3TextSamples.DOCUMENT_SIZE}
                    </th>
                    <th className="table-header">
                      {homePage3TextSamples.INGESTION_TIME}
                    </th>
                    <th className="table-header">
                      {homePage3TextSamples.NO_OF_PAGES}
                    </th>
                    <th className="table-header">
                      {homePage3TextSamples.NO_OF_IMAGE_DOCS}
                    </th>
                    <th className="table-header">
                      {homePage3TextSamples.NO_OF_TABLE_DOCS}
                    </th>
                    <th className="table-header">
                      {homePage3TextSamples.NO_OF_TEXT_DOCS}
                    </th>
                    <th className="table-header">
                      {homePage3TextSamples.TOTAL_INGESTION_TOKENS}
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="table-heading"
                  style={{ fontSize: "0.75rem", textAlign: "center" }}
                >
                  {graphsData &&
                  graphsData.graphData &&
                  Array.isArray(graphsData.graphData[0]) &&
                  graphsData.graphData[0].length > 0 ? (
                    graphsData.graphData[0].map((value, index) => (
                      <tr key={index}>
                        <td>{value?.document_name}</td>
                        <td>{value?.document_size}</td>
                        <td>{value?.ingestion_time}</td>
                        <td>{value?.no_of_pages}</td>
                        <td>{value["no._of_image_docs"]}</td>
                        <td>{value["no._of_table_docs"]}</td>
                        <td>{value["no._of_text_docs"]}</td>
                        <td>{value["total_ingestion_tokens"]}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Table responsive className="mt-2 w-100">
                <thead className="w-100 table-heading">
                  <tr
                    className="table-header w-100"
                    style={{ fontSize: "0.75rem", textAlign: "center" }}
                  >
                    {homePage3TextSamples.QUESTIONS_TABLE_DATA_HEADERS.map(
                      (header, index) => (
                        <th key={index} className="table-header">
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody
                  className="table-heading"
                  style={{ fontSize: "0.75rem", textAlign: "center" }}
                >
                  {graphsData &&
                  graphsData.graphData &&
                  Array.isArray(graphsData.graphData[2]) &&
                  graphsData.graphData[2].length > 0 ? (
                    graphsData.graphData[2].map((value, index) => (
                      <tr key={index}>
                        <td>{value?.Question}</td>
                        <td>{value?.Tech}</td>
                        <td>{value?.pages_context}</td>
                        <td>{value?.pages_relv}</td>
                        <td>{value?.No_of_Chroma_Tokens}</td>
                        <td>{value?.No_ES_Tokens}</td>
                        <td>{value?.No_of_Neo4j_Tokens}</td>
                        <td>{value?.total_tokens}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
