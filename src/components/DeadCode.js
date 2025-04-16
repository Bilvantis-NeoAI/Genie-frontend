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

<Container
    fluid
    className="d-flex justify-content-center align-items-center mt-3"
>
    <Row className="w-50"> {/* Adjusted width here */}
        <Col>
            <Card className="shadow-lg p-4 rounded" style={{ maxWidth: '500px' }}> {/* Set max width for the card */}
                <h3 className="text-center mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>Code Hygiene Analysis</h3>
                <Form noValidate>
                    {/* Repository URL */}
                    <Form.Group className="mb-4">
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
                            style={{ borderRadius: '10px' }}
                        />
                        <Form.Control.Feedback type="invalid">{errors.repo_url}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Branch Name */}
                    <Form.Group className="mb-4">
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
                            style={{ borderRadius: '10px' }}
                        />
                        <Form.Control.Feedback type="invalid">{errors.branch}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Personal Access Token */}
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
                            style={{ borderRadius: '10px' }}
                        />
                        <Form.Control.Feedback type="invalid">{errors.token}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="text-center">
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            className="px-5 py-2"
                            disabled={loading}
                            style={{
                                backgroundColor: '#007bff',
                                borderRadius: '10px',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>

                {/* Files Download Section */}
                {Object.keys(dataFrames).length > 0 && (
                    <>
                        <div className="d-flex gap-2 mt-5" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                            Available files to Download:
                        </div>
                        <div className="d-flex flex-wrap gap-2 mt-3">
                            <Button
                                style={{ fontSize: '14px' }}
                                variant="success"
                                onClick={() => downloadAsExcel(dataFrames.deadCode, "Deadcode_Data")}
                            >
                                Deadcode Code
                            </Button>
                            <Button
                                style={{ fontSize: '14px' }}
                                variant="success"
                                onClick={() => downloadAsExcel(dataFrames.unusedContent, "Unused_Content")}
                            >
                                Unused Content
                            </Button>
                            <Button
                                style={{ fontSize: '14px' }}
                                variant="success"
                                onClick={() => downloadAsExcel(dataFrames.summary, "Summary_of_Issues")}
                            >
                                Unused Summary
                            </Button>
                            <Button
                                style={{ fontSize: '14px' }}
                                variant="success"
                                onClick={() => downloadAsExcel(dataFrames.secrets, "Git_Secrets")}
                            >
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
