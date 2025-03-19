import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
export function DeadCode() {
    const [repoName, setRepoName] = useState("");
    const [oldBranch, setOldBranch] = useState("");
    const [newBranch, setNewBranch] = useState("");
    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [releaseNotes, setReleaseNotes] = useState("");
    const [commitLogs, setCommitLogs] = useState("");
    const handleSubmit = async () => {
        if (!repoName.trim() || !oldBranch.trim() || !newBranch.trim() || !file || !token.trim()) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("repo_url", repoName);
        formData.append("old_branch", oldBranch);
        formData.append("new_branch", newBranch);
        formData.append("csv_file", file);
        formData.append("token", token);

        try {
            const response = await fetch("http://0.0.0.0:8000/generate_release_notes", {
                method: "POST",
                body: formData,
                redirect: "follow",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (response.redirected) {
                toast.error("Request was redirected. Check your API URL or authentication.");
                return;
            }

            const result = await response.json();
            if (!result || !result.release_notes || !result.commit_logs_summary) {
                throw new Error("No valid data returned from the server.");
            }

            setReleaseNotes(result.release_notes);
            setCommitLogs(result.commit_logs_summary || "No commit logs available");
            toast.success("Files processed successfully!");
        } catch (error) {
            toast.error(error.message || "Error processing files!");
            console.error("Submission error:", error);
        }
    };
    return (
        <Container fluid className="vh-100 d-flex flex-column">
            <Row className="sticky-top bg-white shadow-sm">
                <HeaderComponent />
            </Row>
            <Row className="flex-grow-1 d-flex">
                <Col md={1}>
                    <BootstrapSidebar />
                </Col>

                <Col className="col-6 p-2 mt-3 align-items-center deadcard">
                    <Card className="shadow-sm ">
                        <div className="d-flex align-items-center justify-content-center">
                            <h2 className="mb-4 mt-3">Dead Code</h2>
                        </div>
                        <Col className="col-10 mb-4 ms-3">
                            <Row md={8} className="mb-3">
                                <Form.Group as={Row} className="align-items-center">
                                    <Col>
                                        <Form.Label className="fw-bold text-end">Path:</Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Control
                                            className="shadow-sm"
                                            type="text"
                                            placeholder="Repository Name"
                                            value={repoName}
                                            onChange={(e) => setRepoName(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="secondary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Row>

                            <Row md={8} className="mb-3">
                                <Form.Group as={Row} className="align-items-center">
                                    <Col md={2}>
                                        <Form.Label className="fw-bold text-end">File:</Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Control
                                            className="shadow-sm"
                                            type="text"
                                            placeholder="Branch Name"
                                            value={oldBranch}
                                            onChange={(e) => setOldBranch(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <Row md={8} className="mb-3">
                                <Form.Group as={Row} className="align-items-center">
                                    <Col md={2}>
                                        <Form.Label className="fw-bold text-end">PAT:</Form.Label>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Control
                                            className="shadow-sm"
                                            type="password"
                                            placeholder="PAT Token"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Row>

                            <div>
                                <Button variant="primary" onClick={handleSubmit} className="deadSubmit">
                                    Submit
                                </Button>
                            </div>
                        </Col>



                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );

}
