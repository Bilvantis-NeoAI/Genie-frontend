import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from 'react-redux';
import { deadCode } from "../actions/deadCodeAction";
export function DeadCode() {
    const [dataFrames, setDataFrames] = useState({});
    const response = useSelector((state) => state.deadCode?.deadCoderesponse?.payload);
    const [formState, setFormState] = useState({
        repo_url: "",
        branch: "",
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
        const { repo_url, branch, token } = formState;

        if (!repo_url.trim() || !branch.trim() || !token.trim()) {
            toast.error("All fields are required!");
            return;
        }
        const formData = new FormData();
        formData.append("repo_url", repo_url);
        formData.append("branch", branch);
        formData.append("token", token);
        dispatch(deadCode(formData))

    };
    useEffect(() => {
        if (response && typeof response === 'object') {
            const parsedDataFrames = {
                deadCode: JSON.parse(response["Deadcode Data Identified"] || "[]"),
                unusedContent: JSON.parse(response["Unused Content Identified"] || "[]"),
                summary: JSON.parse(response["Summary of Issues"] || "[]"),
                secrets: JSON.parse(response["Git Secrets"] || "[]")
            };
            setDataFrames(parsedDataFrames);
        }
    }, [response]);
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
        <Container fluid className="justify-content-center align-items-center" style={{ marginLeft: '20%' }}>
            <Row className="w-50">
                <Col>
                    <Card className="shadow-lg p-4">
                        <h3 className="text-center mb-4">Code Hygiene Analysis</h3>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Repository Name (URL):</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="repo_url"
                                    placeholder="Enter repo URL"
                                    value={formState.repoName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">branch Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="branch"
                                    placeholder="Enter old branch name"
                                    value={formState.branch}
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
                            <>
                                <div className="d-flex gap-2 mt-5" style={{ fontSize: '15px' }}>Available files to Download:</div>
                                <div className="d-flex flex-wrap gap-2 mt-3">

                                    <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.deadCode, "Deadcode_Data")}>
                                        Deadcode Code
                                    </Button>
                                    <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.unusedContent, "Unused_Content")}>
                                        Unused Content
                                    </Button>
                                    <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.summary, "Summary_of_Issues")}>
                                        Unused Summary
                                    </Button>
                                    <Button style={{ fontSize: '14px' }} variant="success" onClick={() => downloadAsExcel(dataFrames.secrets, "Git_Secrets")}>
                                        Git leats
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