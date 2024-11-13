import { Col, Container, Form, Row, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { homePage3TextSamples } from '../utils/constatnts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGraphList } from '../actions/graphsDataActions';
import { footerTextSamples } from "../utils/constatnts";
import { useLocation } from "react-router-dom";
import { logDOM } from "@testing-library/react";
export function HomePage3() {
    const dispatch = useDispatch();
    const location = useLocation();
    const header = location.state?.header || "Metrics";
    // const graphsData = useSelector((state) => state.graphsData);
    const [barGraphXAxisData, setBarGraphXAxisData] = useState([]);
    const [barGraphData, setBarGraphData] = useState([]);
    const [retrivalGraphData, setRetrivalGraphData] = useState([]);
    const [retrivalGraphXAxisData, setRetrivalGraphXAxisData] = useState([]);


    const graphsData = {
        graphData: [
          // Data for the first table
          [
            {
              document_name: "Document 1",
              document_size: "2 MB",
              ingestion_time: "2024-11-13 10:00",
              no_of_pages: 12,
              "no._of_image_docs": 3,
              "no._of_table_docs": 2,
              "no._of_text_docs": 7,
              total_ingestion_tokens: 1500
            },
            {
              document_name: "Document 2",
              document_size: "5 MB",
              ingestion_time: "2024-11-13 11:00",
              no_of_pages: 20,
              "no._of_image_docs": 5,
              "no._of_table_docs": 4,
              "no._of_text_docs": 11,
              total_ingestion_tokens: 2500
            }
          ],
      
          // Data for the first BarChart
          [
            {
              metricA: 120,
              metricB: 200,
              metricC: 150
            }
          ],
      
          // Data for the second table
          [
            {
              Question: "What is the purpose of this document?",
              Tech: "React",
              pages_context: 5,
              pages_relv: 4,
              No_of_Chroma_Tokens: 100,
              No_ES_Tokens: 80,
              No_of_Neo4j_Tokens: 60,
              total_tokens: 240
            },
            {
              Question: "How does authentication work?",
              Tech: "Node.js",
              pages_context: 6,
              pages_relv: 5,
              No_of_Chroma_Tokens: 120,
              No_ES_Tokens: 90,
              No_of_Neo4j_Tokens: 70,
              total_tokens: 280
            }
          ],
      
          // Data for the second BarChart
          {
            metricX: 300,
            metricY: 450,
            metricZ: 200
          }
        ]
      };
      

    useEffect(() => {
        dispatch(fetchGraphList())
    }, []);

    useEffect(() => {
        if (graphsData && graphsData.graphData && graphsData.graphData[1]?.length > 0) {
            const data = graphsData.graphData[1]
            const BAR_GRAPH_X_AXIS_DATA = Object.keys(data[0]).filter(key => key !== '_id');
            const BAR_GRAPH_DATA = Object.values(data[0]).filter((value, index) => index !== 0);
            setBarGraphXAxisData(BAR_GRAPH_X_AXIS_DATA);
            setBarGraphData(BAR_GRAPH_DATA);
        }

        if (graphsData && graphsData.graphData && graphsData.graphData[3]) {
            const newData = graphsData.graphData[3];
            const NEW_GRAPH_X_AXIS_DATA = Object.keys(newData).filter(key => key !== '_id');
            const NEW_GRAPH_DATA = Object.values(newData).filter((value, index) => index !== 0);
            setRetrivalGraphXAxisData(NEW_GRAPH_X_AXIS_DATA);
            setRetrivalGraphData(NEW_GRAPH_DATA);
        }

    }, [graphsData])

    return (
        <Container className=' w-100' fluid style={{ height: '100vh' }}>
            <Row style={{ height: '10vh' }} >
                <HeaderComponent></HeaderComponent>
            </Row>
            <div className="w-100 mt-3" style={{ height: '82vh' }} >
                <div style={{ width: '10%' }}>
                    <BootstrapSidebar></BootstrapSidebar>
                </div>
                <div className='col-11   h-100 ms-5 mb-5 pb-4' >
                    <div className='card d-flex h-100 question-card ms-4' style={{ overflowY: 'scroll' }} >
                        <div className='dasboard-container mt-3 container-fluid'>
                        <h4>{header}</h4>

                            <div className='top-charts-container row'>
                                <div className='col-12 col-md-6 mb-2'>
                                    <div className='card card-container shadow'>
                                        <BarChart
                                            className='chart-styling'
                                            series={[
                                                { data: barGraphData, label: 'Cummulative Metrics', id: 'pvId', },
                                            ]}
                                            xAxis={[{
                                                data: barGraphXAxisData, scaleType: 'band', disableLine: true, disableTicks: true, categoryGapRatio: 0.7,
                                                barGapRatio: 0.2,
                                            }]}
                                            yAxis={[{
                                                disableTicks: true,
                                            }]}
                                        />
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 mb-2'>
                                    <div className='card card-container shadow'>
                                        <BarChart
                                            className='chart-styling'
                                            series={[
                                                { data: retrivalGraphData, label: 'Cummulative Retrival Metrics', id: 'pvId', color: '#2196F3', },
                                            ]}
                                            xAxis={[{
                                                data: retrivalGraphXAxisData, scaleType: 'band', disableLine: true, disableTicks: true, categoryGapRatio: 0.7,
                                                barGapRatio: 0.8,
                                            }]}
                                            yAxis={[{
                                                disableTicks: true,
                                            }]}
                                            borderRadius="15"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Table
                                responsive
                                className="mt-2 w-100"
                            >
                                <thead className=" w-100">
                                    <tr className="table-header w-100 ">
                                        <th className="table-header" >
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
                                <tbody>
                                    {graphsData && graphsData.graphData && Array.isArray(graphsData.graphData[0]) && graphsData.graphData[0].length > 0 ? (
                                        graphsData.graphData[0].map((value, index) => (
                                            <tr key={index}>
                                                <td>{value?.document_name}</td>
                                                <td>{value?.document_size}</td>
                                                <td>{value?.ingestion_time}</td>
                                                <td>{value?.no_of_pages}</td>
                                                <td>{value['no._of_image_docs']}</td>
                                                <td>{value['no._of_table_docs']}</td>
                                                <td>{value['no._of_text_docs']}</td>
                                                <td>{value['total_ingestion_tokens']}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr style={{ textAlign: 'center' }}>
                                            <td colSpan="8">No data available</td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table>

                            <Table
                                responsive
                                className="mt-2 w-100"
                            >
                                <thead className="w-100">
                                    <tr className="table-header w-100">
                                        {homePage3TextSamples.QUESTIONS_TABLE_DATA_HEADERS.map((header, index) => (
                                            <th key={index} className="table-header">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {graphsData && graphsData.graphData && Array.isArray(graphsData.graphData[2]) && graphsData.graphData[2].length > 0 ? (
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
                                        <tr style={{ textAlign: 'center' }}>
                                            <td colSpan="8">No data available</td>
                                        </tr>
                                    )}
                                </tbody>

                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded'>
                <span style={{
                    color: "white"
                }}>{footerTextSamples.BILVANTIS} </span>
            </div>
        </Container >
    )

}