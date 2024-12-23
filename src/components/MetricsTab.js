import { Container, Row, Tab, Nav } from "react-bootstrap";
import SeverityMetric from "./SeverityMetric";
import QualityMetric from "./QualityMetric";
import CommonIssuesMetric from "./CommonIssuesMetric";
import { HeaderComponent } from "./Header";
import { useState } from "react";
import SideNav from "./SideNav";
export default function MetricTabs() {
    const [activeTab, setActiveTab] = useState("Severity");

    return (
        <>
            <Container fluid className="w-100" style={{ backgroundColor: "#F8F8F8" }}>
                <Row
                    style={{
                        height: "12vh",
                        position: "fixed",
                        width:'100%',
                        left:0,
                        top: 0,
                        zIndex: 1000,
                    }}
                >
                    <HeaderComponent />
                </Row>
                <div className="w-100 mt-3">
                    <div style={{ width: "10%" }}>
                        <SideNav />
                    </div>
                    <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                        <Nav
                            style={{
                                borderBottom: "2px solid #ccc",
                                // backgroundColor: "#AEB4BB",
                                marginLeft: '5%',
                                marginTop:'4%'
                            }}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="Severity" style={{ color: activeTab === "Severity" ? "#07439C" : "#666666" }}
                                >Issue Severity Distribution</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Quality" style={{ color: activeTab === "Quality" ? "#07439C" : "#666666" }}
                                >Code Quality Per User</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Common" style={{ color: activeTab === "Common" ? "#07439C" : "#666666" }}
                                >Most Common Issues</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content
                            style={{
                                marginTop: "20px",
                                marginLeft: '5%'

                            }}
                        >
                            <Tab.Pane eventKey="Severity">
                                <SeverityMetric />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Quality">
                                <QualityMetric />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Common">
                                <CommonIssuesMetric />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </>
    );
}