import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { deadCode } from "../actions/deadCodeAction";

export function DeadCode() {
  const [dataFrames, setDataFrames] = useState({});
  const [loading, setLoading] = useState(false);
  const response = useSelector(
    (state) => state.deadCode?.deadCoderesponse?.payload
  );

  const [formState, setFormState] = useState({
    repo_url: "",
    branch: "",
    token: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : `This field is required`,
    }));
  };

  const handleSubmit = async () => {
    const { repo_url, branch, token } = formState;
    // const newErrors = {};
    // if (!repo_url.trim()) newErrors.repo_url = "Repository URL is required";
    // if (!branch.trim()) newErrors.branch = "Branch name is required";
    // if (!token.trim()) newErrors.token = "Token is required";
    const newErrors = {};

    const repoUrlRegex =
      /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+(\.git)?$/i;
    const branchRegex = /^[a-zA-Z0-9_\-/]+$/;

    if (!repo_url.trim()) {
      newErrors.repo_url = "Repository URL is required";
    } else if (!repoUrlRegex.test(repo_url.trim())) {
      newErrors.repo_url = "Enter a valid GitHub repository URL";
    }

    if (!branch.trim()) {
      newErrors.branch = "Branch name is required";
    } else if (!branchRegex.test(branch.trim())) {
      newErrors.branch = "Branch name is invalid";
    }

    if (!token.trim()) {
      newErrors.token = "Token is required";
    } else if (
      !/^(ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{50,})$/.test(token.trim())
    ) {
      newErrors.token = "Token format is invalid. Must be a valid GitHub PAT.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("repo_url", repo_url);
    formData.append("branch", branch);
    formData.append("token", token);

    dispatch(deadCode(formData)).finally(() => {
      setFormState({
        repo_url: "",
        branch: "",
        token: "",
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    if (response && typeof response === "object") {
      const parsedDataFrames = {
        deadCode: JSON.parse(response["Deadcode Data Identified"] || "[]"),
        unusedContent: JSON.parse(
          response["Unused Content Identified"] || "[]"
        ),
        summary: JSON.parse(response["Summary of Issues"] || "[]"),
        secrets: JSON.parse(response["Git Secrets"] || "[]"),
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
        <div className="fullscreen-overlay">
          <Spinner animation="border" role="status" className="large-spinner">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <Container
        fluid
        className="d-flex justify-content-center align-items-center mt-3 mb-3"
      >
        <Row className="w-50">
          {" "}
          <Col>
            <Card className="shadow-lg p-4 rounded custom-card ">
              {" "}
              <h3 className="text-center mb-4 custom-card-title">
                Code Hygiene Analysis
              </h3>
              <Form noValidate>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    Repository Name (URL):{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="repo_url"
                    placeholder="Enter repo URL"
                    value={formState.repo_url}
                    onChange={handleChange}
                    isInvalid={!!errors.repo_url}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.repo_url}
                  </Form.Control.Feedback>
                </Form.Group>

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
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.branch}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">
                    Personal Access Token (PAT):{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="token"
                    placeholder="Enter PAT token"
                    value={formState.token}
                    onChange={handleChange}
                    isInvalid={!!errors.token}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.token}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className="px-5 py-2"
                    disabled={loading}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    }
                  >
                    Submit
                  </Button>
                </div>
              </Form>
              {Object.keys(dataFrames).length > 0 && (
                <>
                  <div className="d-flex gap-2 mt-5 download-label">
                    Available files to Download:
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <Button
                      className="small-button-text"
                      variant="success"
                      onClick={() =>
                        downloadAsExcel(dataFrames.deadCode, "Deadcode_Data")
                      }
                    >
                      Deadcode Code
                    </Button>
                    <Button
                      className="small-button-text"
                      variant="success"
                      onClick={() =>
                        downloadAsExcel(
                          dataFrames.unusedContent,
                          "Unused_Content"
                        )
                      }
                    >
                      Unused Content
                    </Button>
                    <Button
                      className="small-button-text"
                      variant="success"
                      onClick={() =>
                        downloadAsExcel(dataFrames.summary, "Summary_of_Issues")
                      }
                    >
                      Unused Summary
                    </Button>
                    <Button
                      className="small-button-text"
                      variant="success"
                      onClick={() =>
                        downloadAsExcel(dataFrames.secrets, "Git_Secrets")
                      }
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
