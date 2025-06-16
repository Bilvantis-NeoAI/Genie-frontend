import { Container, Row, Tab, Nav } from "react-bootstrap";
import { HeaderComponent } from "./header";
import { useState } from "react";
import { BootstrapSidebar } from "./sideNav";
import IngestionRepo from "./IngesitonRepo";
import { DeadCode } from "./DeadCode";
import RetrieveData from "./RetrieveData";
import { GitReleaseNote } from "./GitReleaseNote";
import "../styles/HomePageThree.css";
import "../styles/GitOperations.css";

export function GitOperations() {

    const [activeTab, setActiveTab] = useState("repoingestion");
    const tabStyle = (tabName) => ({
        color: activeTab === tabName ? "#07439C" : "#666666",
    });
    return (
        <>
            <Container fluid className="w-100" >
                <Row className="sticky-row">
                    <HeaderComponent />
                </Row>

                <div className="w-100">
                    <div >
                        <BootstrapSidebar />
                    </div>
                    <Tab.Container activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                        <Nav
                            className="nav-custom"
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
                          
                        </Nav>
                        <Tab.Content
                          className="tab-content-custom"
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
                        
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </>
    );
}