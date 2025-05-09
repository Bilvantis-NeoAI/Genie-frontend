import { Container, Row, Tab, Nav } from "react-bootstrap";
import SeverityMetric from "./SeverityMetric";
import QualityMetric from "./QualityMetric";
import UsageMetric from "./UsageMetric";
import { HeaderComponent } from "./header";
import { useState } from "react";
import { BootstrapSidebar } from "./sideNav";
import CommitReviewMetric from "./CommitReviewMetric";
import TestAIMetrics from "./TestAIMetrics";
import IngestionRepo from "./IngesitonRepo";
import { DeadCode } from "./DeadCode";
import RetrieveData from "./RetrieveData";
import { GitReleaseNote } from "./GitReleaseNote";

import { HomePage1 } from "./homePage1";
import GitMetrics from "./GitMetrics";
import { HomePage } from "./homePage";

export function KbmsOperations() {

    const [activeTab, setActiveTab] = useState("gitmetrics");
    const tabStyle = (tabName) => ({
        color: activeTab === tabName ? "#07439C" : "#666666",
    });
    return (
        <>
            <Container fluid className="w-100" >
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
                                fontSize: '15px'
                            }}
                        >
                            <Nav.Link eventKey="gitmetrics" style={tabStyle("gitmetrics")}>
                              Metrics
                            </Nav.Link>
                            <Nav.Link eventKey="qa" style={tabStyle("qa")}>
                                Q&A
                            </Nav.Link>
                            <Nav.Link eventKey="document" style={tabStyle("document")}>
                                 Upload Document
                            </Nav.Link>
                        </Nav>
                        <Tab.Content
                            style={{
                                marginTop: "10px",
                                marginLeft: '5%',
                                padding: "0 2px",
                            }}
                        >
                            <Tab.Pane eventKey="gitmetrics" type='gitmetrics'>
                                <GitMetrics />
                            </Tab.Pane>
                            <Tab.Pane eventKey="qa" type='qa'>
                                <HomePage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="document"><HomePage1 type='document' />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </>
    );
}