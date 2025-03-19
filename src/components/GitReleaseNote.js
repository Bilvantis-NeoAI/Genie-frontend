import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { footerTextSamples } from "../utils/constatnts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export function GitReleaseNote() {
    const [repoName, setRepoName] = useState("");
    const [oldBranch, setOldBranch] = useState("");
    const [newBranch, setNewBranch] = useState("");
    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [releaseNotes, setReleaseNotes] = useState("");
    const [commitLogs, setCommitLogs] = useState("");

    const handleFileChange = (event) => {
        try {
            const selectedFile = event.target.files[0];
            if (!selectedFile) {
                toast.error("Please select a file.");
                return;
            }
            setFile(selectedFile);
        } catch (error) {
            toast.error("Error selecting file. Please try again.");
            console.error("File selection error:", error);
        }
    };

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

    const handleDownload = (data, filename) => {
        const blob = new Blob([data], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Container fluid className="vh-100 d-flex flex-column">
            {/* Header */}
            <Row className="sticky-top bg-white shadow-sm">
                <HeaderComponent />
            </Row>
            <Row className="flex-grow-1 d-flex">
                <Col md={1} className="bg-light">
                    <BootstrapSidebar />
                </Col>

                <Col md={10} className="p-4">
                    <Card className="p-4 shadow-sm">
                        <h2 className="mb-4" style={{fontSize:'25px'}}>Upload Git Release Note</h2>

                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Repository Name</Form.Label>
                                    <Form.Control className="shadow-sm" type="text" placeholder="Repository Name" value={repoName} onChange={(e) => setRepoName(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Old Branch</Form.Label>
                                    <Form.Control className="shadow-sm" type="text" placeholder="Old Branch" value={oldBranch} onChange={(e) => setOldBranch(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>New Branch</Form.Label>
                                    <Form.Control className="shadow-sm" type="text" placeholder="New Branch" value={newBranch} onChange={(e) => setNewBranch(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3 mt-5">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>PAT Token</Form.Label>
                                    <Form.Control className="shadow-sm" type="text" placeholder="PAT Token" value={token} onChange={(e) => setToken(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Upload Features (CSV File)</Form.Label>
                                    <Form.Control className="shadow-sm" type="file" accept=".csv" onChange={handleFileChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" onClick={handleSubmit} className="mt-3 w-100">
                            Submit
                        </Button>

                        {/* Display Results */}
                        {releaseNotes && (
                            <div className="mt-4">
                                <h3 className="text-success">Release Notes:</h3>
                                <Form.Control as="textarea" rows={5} value={releaseNotes} readOnly className="mb-2" />
                                <Button variant="success" onClick={() => handleDownload(releaseNotes, "release_notes.txt")} className="me-2">
                                    Download Release Notes
                                </Button>

                                <h3 className="mt-4 text-info">Commit Logs:</h3>
                                <Form.Control as="textarea" rows={5} value={commitLogs || "No commit logs available"} readOnly className="mb-2" />
                                <Button variant="dark" onClick={() => handleDownload(commitLogs, "commit_logs.txt")}>
                                    Download Commit Logs Summary
                                </Button>
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}
