import { Col, Container, Form, Row, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { BootstrapSidebar } from './sideNav';
import { HeaderComponent } from './header';
import { useState } from 'react';
import { response } from '../Utils';
import { fetchData } from '../Services/homePageService';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { homePage3TextSamples } from '../utils/constatnts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGraphList } from '../actions/graphsDataActions';

export function HomePage3() {
    const dispatch = useDispatch();
    const graphsData = useSelector((state) => state.graphsData);

    const tabledata = [
        {
          Document: 'Document 1',
          PageNo: 12,
          Name: 'John Doe',
          Link: 'https://example.com/document1'
        },
        {
          Document: 'Document 2',
          PageNo: 34,
          Name: 'Jane Smith',
          Link: 'https://example.com/document2'
        },
        {
          Document: 'Document 3',
          PageNo: null,  // No PageNo will display as '-'
          Name: null,    // No Name will display as '-'
          Link: 'https://example.com/document3'
        }
      ];

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
                            <div className='top-charts-container row'>
                                <div className='col-12 col-md-6 mb-2'>
                                    <div className='card card-container shadow'>
                                        <BarChart
                                            className='chart-styling'
                                            series={[
                                                { data: homePage3TextSamples.BAR_GRAPH_DATA, label: 'Courses', id: 'pvId', },
                                            ]}
                                            xAxis={[{
                                                data: homePage3TextSamples.BAR_GRAPH_X_AXIS_DATA, scaleType: 'band', disableLine: true, disableTicks: true, categoryGapRatio: 0.7,
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
                                                { data: homePage3TextSamples.BAR_GRAPH_DATA, label: 'Courses', id: 'pvId', color: '#2196F3', },
                                            ]}
                                            xAxis={[{
                                                data: homePage3TextSamples.BAR_GRAPH_X_AXIS_DATA, scaleType: 'band', disableLine: true, disableTicks: true, categoryGapRatio: 0.7,
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
                                            Document{" "}
                                        </th>
                                        <th className="table-header">
                                            Page&nbsp;No
                                        </th>
                                        <th className="table-header">
                                            Name{" "}
                                        </th>
                                        <th className="table-header">
                                            Link{" "}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata.map((value, index) => (
                                        <tr>
                                            <td>{value?.Document}</td>
                                            <td>{value?.PageNo || '-'}</td>
                                            <td>{value?.Name || '-'}</td>
                                            <td>
                                                <a href={value?.Link}>
                                                    {value?.Link}
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='position-sticky bottom-0 d-flex justify-content-center align-items-center footer-style ms-5 me-1 rounded'>
                <span style={{
                    color: "white"
                }}>@Bilvantis 2024 </span>
            </div>
        </Container >
    )

}