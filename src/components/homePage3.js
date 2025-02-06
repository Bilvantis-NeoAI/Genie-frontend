import { Container, Row, Tab, Nav } from "react-bootstrap";
import SeverityMetric from "./SeverityMetric";
import QualityMetric from "./QualityMetric";
import UsageMetric from "./UsageMetric";
import { HeaderComponent } from "./header";
import { useState } from "react";
import { BootstrapSidebar } from "./sideNav";
import CommitReviewMetric from "./CommitReviewMetric";
// export default function homePage3() {
export function HomePage3() {

    const [activeTab, setActiveTab] = useState("Severity");
    const tabStyle = (tabName) => ({
        color: activeTab === tabName ? "#07439C" : "#666666",
    });
    return (
        <>
            <Container fluid className="w-100" >
                {/* <Row style={{ height: '10vh' }}>
                    <HeaderComponent />
                </Row> */}
                <Row style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <HeaderComponent />
        </Row>

                <div className="w-100">
                    <div style={{ width: '10%' }}>
                        <BootstrapSidebar />
                    </div>
                    <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                        <Nav
                            style={{
                                borderBottom: "1px solid #dcdcdc",
                                position: 'sticky',
                                marginLeft: '5%',
                                // marginTop: '1%',
                                fontSize: '15px'
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
                            <Nav.Link eventKey="Commit" style={tabStyle("Commit")}>
                                Commit Review Metrics
                            </Nav.Link>
                        </Nav>
                        <Tab.Content
                            style={{
                                marginTop: "26px",
                                marginLeft: '5%',
                                backgroundColor: "rgb(248, 248, 248)",
                                padding: "0 2px",
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
                            <Tab.Pane eventKey="Commit" type='commit'>
                                <CommitReviewMetric/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </>
    );
}