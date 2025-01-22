import { Container, Row, Tab, Nav } from "react-bootstrap";
import SeverityMetric from "./SeverityMetric";
import QualityMetric from "./QualityMetric";
import UsageMetric from "./UsageMetric";
import { HeaderComponent } from "./HeaderComponent";
import { useState } from "react";
import SideNav from "./SideNavComponent";
import CommitReviewMetric from "./CommitReviewMetric";
export default function MetricTabs() {
    const [activeTab, setActiveTab] = useState("Severity");
    const tabStyle = (tabName) => ({
        color: activeTab === tabName ? "#07439C" : "#666666",
    });
    return (
        <>
            <Container fluid className="w-100" >
                <Row className="metric-row">
                    <HeaderComponent />
                </Row>
                <div className="w-100 mt-3">
                    <div>
                        <SideNav />
                    </div>
                    <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                        <Nav className="Nav-tabs">
                            <Nav.Link eventKey="Severity" style={tabStyle("Severity")}>
                                Issue Severity Distribution
                            </Nav.Link>
                            <Nav.Link eventKey="Quality" style={tabStyle("Quality")}>
                                Code Quality Per User
                            </Nav.Link>
                            <Nav.Link eventKey="Usage" style={tabStyle("Usage")}>
                                Usage Metrics
                            </Nav.Link>
                            <Nav.Link eventKey="Commit" style={tabStyle("Commit")}>
                                Commit Review Metrics
                            </Nav.Link>
                        </Nav>
                        <Tab.Content className="nav-components">
                            <Tab.Pane eventKey="Severity" type='severity'>
                                <SeverityMetric />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Quality" type='quality'>
                                <QualityMetric />
                            </Tab.Pane>
                            <Tab.Pane eventKey="Usage" type='usage'>
                                <UsageMetric />
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