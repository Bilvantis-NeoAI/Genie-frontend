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
import Fixit from "./Fixit";
export function GitOperations() {

    const [activeTab, setActiveTab] = useState("repoingestion");
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
                            <Nav.Link eventKey="repoingestion" style={tabStyle("repoingestion")}>
                                Repo Ingestion
                            </Nav.Link>
                            <Nav.Link eventKey="gitqa" style={tabStyle("gitqa")}>
                                Q&A
                            </Nav.Link>
                            <Nav.Link eventKey="deadcode" style={tabStyle("deadcode")}>
                                 Code Hygiene
                            </Nav.Link>
                            <Nav.Link eventKey="gitrealse" style={tabStyle("gitrealse")}>
                                Release Note & Commit logs
                            </Nav.Link>
                            {/* <Nav.Link eventKey="fixit" style={tabStyle("fixit")}>
                               Fix It
                            </Nav.Link> */}
                        </Nav>
                        <Tab.Content
                            style={{
                                marginTop: "10px",
                                marginLeft: '5%',
                                padding: "0 2px",
                            }}
                        >
                            <Tab.Pane eventKey="repoingestion" type='repoingestion'>
                                <IngestionRepo />
                            </Tab.Pane>
                            <Tab.Pane eventKey="gitqa" type='gitqa'>
                                <RetrieveData />
                            </Tab.Pane>
                            <Tab.Pane eventKey="deadcode"><DeadCode type='deadcode' />
                            </Tab.Pane>
                            <Tab.Pane eventKey="gitrealse" type='gitrealse'>
                                <GitReleaseNote />
                            </Tab.Pane>
                            {/* <Tab.Pane eventKey="fixit" type='fixit'>
                                <Fixit/>
                            </Tab.Pane> */}
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </>
    );
}