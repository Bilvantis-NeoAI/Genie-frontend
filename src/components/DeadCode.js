import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from 'react-redux';
import { deadCode } from "../actions/deadCodeAction";
export function DeadCode() {
    const [dataFrames, setDataFrames] = useState({});

    const [formState, setFormState] = useState({
        repoName: "",
        Branch: "",
        token: ""
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async () => {
        const { repoName, Branch, token } = formState;

        if (!repoName.trim() || !Branch.trim() || !token.trim()) {
            toast.error("All fields are required!");
            return;
        }
        dispatch(deadCode(formState))
        try {
            const simulatedResponse = {
                "Deadcode Data Identified": "[{\"S_no\":1,\"Depth\":0,\"No. of Nodes\":1,\"Root Function\":\"extract_text\",\"Root File\":\"Temp\\/Repository\\/extract_text.py\",\"File Path\":\"Temp\\/Repository\\/extract_text.py\",\"Line Number\":5,\"Function Name\":\"extract_text\"},{\"S_no\":2,\"Depth\":0,\"No. of Nodes\":1,\"Root Function\":\"extract_text\",\"Root File\":\"Temp\\/Repository\\/extract_text.py\",\"File Path\":\"Temp\\/Repository\\/extract_text.py\",\"Line Number\":5,\"Function Name\":\"extract_text\"}]",
                "Unused Content Identified": "[{\"File Path\":\"Temp\\/Repository\\/auth_system.py\",\"Line\":13,\"Column\":1,\"Error Code\":\"E302\",\"Description\":\"expected 2 blank lines, found 1\"}]",
                "Summary of Issues": "[{\"Issue Type\":\"E302\",\"Count\":4},{\"Issue Type\":\"Total\",\"Count\":13}]",
                "Git Secrets": "[]"
            };

            const parsedDataFrames = {
                deadCode: JSON.parse(simulatedResponse["Deadcode Data Identified"]),
                unusedContent: JSON.parse(simulatedResponse["Unused Content Identified"]),
                summary: JSON.parse(simulatedResponse["Summary of Issues"]),
                secrets: JSON.parse(simulatedResponse["Git Secrets"])
            };

            setDataFrames(parsedDataFrames);
            toast.success("Dataframes received and parsed successfully!");
        } catch (error) {
            toast.error(error.message || "Error processing files!");
            console.error("Submission error:", error);
        }
    };

    const downloadAsExcel = (data, fileName) => {
        if (!data || data.length === 0) {
            toast.warn(`No data available for ${fileName}`);
            return;
        }

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <Container fluid className="justify-content-center align-items-center" style={{marginLeft:'20%'}}>
            <Row className="w-50">
                <Col>
                    <Card className="shadow-lg p-4">
                        <h2 className="text-center mb-4">Dead Code Analysis</h2>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Repository Name (URL):</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="repoName"
                                    placeholder="Enter repo URL"
                                    value={formState.repoName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Branch Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Branch"
                                    placeholder="Enter old branch name"
                                    value={formState.oldBranch}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">Personal Access Token (PAT):</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="token"
                                    placeholder="Enter PAT token"
                                    value={formState.token}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button variant="primary" onClick={handleSubmit} className="px-5">
                                    Submit
                                </Button>
                            </div>
                        </Form>

                        {Object.keys(dataFrames).length > 0 && (
                            <div className="d-flex flex-wrap gap-2 mt-5" style={{ fontSize: '10px' }}>
                                <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.deadCode, "Deadcode_Data")}>
                                    Download Deadcode Data
                                </Button>
                                <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.unusedContent, "Unused_Content")}>
                                    Download Unused Content
                                </Button>
                                <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.summary, "Summary_of_Issues")}>
                                    Download Summary
                                </Button>
                                <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.secrets, "Git_Secrets")}>
                                    Download Git Secrets
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