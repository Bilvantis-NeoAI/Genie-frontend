import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import * as XLSX from "xlsx";

export function DeadCode() {
    const [repoName, setRepoName] = useState("");
    const [oldBranch, setOldBranch] = useState("");
    const [newBranch, setNewBranch] = useState("");
    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [dataFrames, setDataFrames] = useState({}); // holds the 4 dataframes

    const handleSubmit = async () => {
        if (!repoName.trim() || !oldBranch.trim() || !token.trim()) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("repo_url", repoName);
        formData.append("old_branch", oldBranch);
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

            const result = await response.json();

            if (!result || !result.dataframe1 || !result.dataframe2 || !result.dataframe3 || !result.dataframe4) {
                throw new Error("Incomplete dataframe response from server.");
            }

            setDataFrames({
                df1: [
                    { id: 1, name: "FunctionA", status: "Dead" },
                    { id: 2, name: "FunctionB", status: "Alive" }
                ],
                df2: [
                    { file: "main.py", lines_removed: 10 },
                    { file: "utils.py", lines_removed: 4 }
                ],
                df3: [
                    { author: "Alice", commits: 3 },
                    { author: "Bob", commits: 5 }
                ],
                df4: [
                    { date: "2024-01-01", changes: "Refactored codebase" },
                    { date: "2024-01-05", changes: "Removed unused imports" }
                ]
            });


            toast.success("Dataframes received successfully!");
        } catch (error) {
            toast.error(error.message || "Error processing files!");
            console.error("Submission error:", error);
        }
    };

    const downloadAsExcel = (data, fileName) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <Container fluid className="justify-content-center align-items-center mt-4">
            <Row className="w-100 justify-content-center">
                <Col>
                    <Card className="shadow-lg p-4">
                        <h2 className="text-center mb-4">Dead Code Analysis</h2>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Repository Name (URL):</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter repo URL"
                                    value={repoName}
                                    onChange={(e) => setRepoName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Branch Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter branch name"
                                    value={oldBranch}
                                    onChange={(e) => setOldBranch(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">Personal Access Token (PAT):</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter PAT token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="primary" onClick={handleSubmit} className="px-5">
                                    Submit
                                </Button>
                            </div>
                        </Form>

                        {Object.keys(dataFrames).length > 0 && (
                            <>
                            <div className="d-flex mt-5">
                                <Button variant="success" className="me-2 mb-2" onClick={() => downloadAsExcel(dataFrames.df1, "DataFrame1")}>
                                    Download DF1
                                </Button>
                                <Button variant="success" className="me-2 mb-2" onClick={() => downloadAsExcel(dataFrames.df2, "DataFrame2")}>
                                    Download DF2
                                </Button>
                                </div>
                                <div className="d-flex">
                                <Button variant="success" className="me-2 mb-2" onClick={() => downloadAsExcel(dataFrames.df3, "DataFrame3")}>
                                    Download DF3
                                </Button>
                                <Button variant="success" className="mb-2" onClick={() => downloadAsExcel(dataFrames.df4, "DataFrame4")}>
                                    Download DF4
                                </Button>
                            </div>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>

            <ToastContainer />
        </Container>
    );
}
