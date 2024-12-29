import { Container, Row, Tab, Nav } from "react-bootstrap";
import SeverityMetric from "./SeverityMetric";
import QualityMetric from "./QualityMetric";
import UsageMetric from "./UsageMetric";
import { HeaderComponent } from "./Header";
import { useState } from "react";
import SideNav from "./SideNav";
export default function MetricTabs() {
    console.log("from metrics tab");

    const [activeTab, setActiveTab] = useState("Severity");
    const tabStyle = (tabName) => ({
        color: activeTab === tabName ? "#07439C" : "#666666",
    });
    return (
        <>
            <Container fluid className="w-100" >
                <Row
                    style={{
                        height: "12vh",
                        position: "fixed",
                        width: '100%',
                        left: 0,
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
                                borderBottom: "2px solid #878786",
                                position: 'sticky',
                                marginLeft: '5%',
                                marginTop: '5%'
                            }}
                        >
                            <Nav.Link eventKey="Severity" style={tabStyle("Severity")}>
                                Issue Severity Distribution
                            </Nav.Link>
                            <Nav.Link eventKey="Quality" style={tabStyle("Quality")}>
                                Code Quality Per User
                            </Nav.Link>
                            <Nav.Link eventKey="Usage" style={tabStyle("Usage")}>
                                Usage Metric
                            </Nav.Link>
                        </Nav>
                        <Tab.Content
                            style={{
                                marginTop: "26px",
                                marginLeft: '5%',
                                backgroundColor: "rgb(248, 248, 248)",
                                padding: "0 10px",
                            }}
                        >
                            <Tab.Pane eventKey="Severity" type='severity'>
                                <SeverityMetric />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Quality" type='quality'>
                                <QualityMetric />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Usage"><UsageMetric type='usage' />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </>
    );
}