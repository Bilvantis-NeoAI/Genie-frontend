import {
    Container, Row, Col, Form, Button, Card, Spinner
} from "react-bootstrap";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { deadCode } from "../actions/deadCodeAction";

export function DeadCode() {
    const [dataFrames, setDataFrames] = useState({});
    const [loading, setLoading] = useState(false);
    const response = useSelector((state) => state.deadCode?.deadCoderesponse?.payload);

    const [formState, setFormState] = useState({
        repo_url: "",
        branch: "",
        token: ""
    });

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: value.trim() ? "" : `This field is required`
        }));
    };

    const handleSubmit = async () => {
        const { repo_url, branch, token } = formState;
        const newErrors = {};
        if (!repo_url.trim()) newErrors.repo_url = "Repository URL is required";
        if (!branch.trim()) newErrors.branch = "Branch name is required";
        if (!token.trim()) newErrors.token = "Token is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("repo_url", repo_url);
        formData.append("branch", branch);
        formData.append("token", token);

        dispatch(deadCode(formData))
            .finally(() => {
                setFormState({
                    repo_url: "",
                    branch: "",
                    token: ""
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        if (response && typeof response === "object") {
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
            return;
        }

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <>
            {loading && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    zIndex: 9999,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Spinner animation="border" role="status" style={{ width: "4rem", height: "4rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            <Container fluid className="justify-content-center align-items-center" style={{ marginLeft: '20%' }}>
                <Row className="w-50">
                    <Col>
                        <Card className="shadow-lg p-4">
                            <h3 className="text-center mb-4">Code Hygiene Analysis</h3>
                            <Form noValidate>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">
                                        Repository Name (URL): <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="repo_url"
                                        placeholder="Enter repo URL"
                                        value={formState.repo_url}
                                        onChange={handleChange}
                                        isInvalid={!!errors.repo_url}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.repo_url}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">
                                        Branch Name: <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="branch"
                                        placeholder="Enter branch name"
                                        value={formState.branch}
                                        onChange={handleChange}
                                        isInvalid={!!errors.branch}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.branch}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">
                                        Personal Access Token (PAT): <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="token"
                                        placeholder="Enter PAT token"
                                        value={formState.token}
                                        onChange={handleChange}
                                        isInvalid={!!errors.token}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.token}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="text-center">
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit}
                                        className="px-5"
                                        disabled={loading}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>

                            {Object.keys(dataFrames).length > 0 && (
                                <>
                                    <div className="d-flex gap-2 mt-5" style={{ fontSize: '15px' }}>
                                        Available files to Download:
                                    </div>
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
                                            Git Leaks
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </>
    );
}
