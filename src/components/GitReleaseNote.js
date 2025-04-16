import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { gitReleaseNote, gitRealseFeedback, gitCommitFeedback, deleteTempDir } from '../actions/gitReleaseNoteActions';
import { useEffect, useState } from 'react';
import Papa from "papaparse";
import Swal from "sweetalert2";

export function GitReleaseNote() {
    const [repoName, setRepoName] = useState("");
    const [oldBranch, setOldBranch] = useState("");
    const [newBranch, setNewBranch] = useState("");
    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [releaseNotes, setReleaseNotes] = useState("");
    const [commitLogs, setCommitLogs] = useState("");
    const [errors, setErrors] = useState({});
    const [releaseNotesFeedback, setReleaseNotesFeedback] = useState("");
    const [commitLogsFeedback, setCommitLogsFeedback] = useState("");
    const [csvData, setCsvData] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const response = useSelector((state) => state.gitNoteResponse);
    const result = response?.gitReleaseNote?.payload;
    const releaseFeedback = response?.gitReleaseNoteFeedback?.payload
    const commitFeedback = response?.gitCommitNoteFeedback?.payload
    const FullScreenLoader = () => (
        <div className="loader-overlay">
            <div className="spinner-border text-white" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    useEffect(() => {
        if (result) {
            setReleaseNotes(result.release_notes);
            setCommitLogs(result.commit_logs_summary);
            setLoading(false)
        }
        if (releaseFeedback) {
            setReleaseNotes(releaseFeedback.rephrased_release_notes);
            setReleaseNotesFeedback("");
        }
        if (commitFeedback) {
            setCommitLogs(commitFeedback.rephrased_commit_logs_summary);
            setCommitLogsFeedback("");
        }
    }, [response]);
    const handleFileChange = (event) => {
        try {
            const selectedFile = event.target.files[0];
            if (!selectedFile) {
                return;
            }
            Papa.parse(selectedFile, {
                header: true,
                dynamicTyping: true,
                complete: (result) => {
                    setCsvData(result.data);
                    setFile(selectedFile);
                },
                error: (error) => {
                    console.error("CSV parsing error:", error);
                },
            });
        } catch (error) {
            console.error("File selection error:", error);
        }
    };
    const handleCsvDataChange = (index, field, value) => {
        const updatedData = [...csvData];
        updatedData[index][field] = value;
        setCsvData(updatedData);
    };
    const validateForm = () => {
        const newErrors = {};
        if (!repoName.trim()) newErrors.repoName = "Repository Name is required";
        if (!oldBranch.trim()) newErrors.oldBranch = "Old Branch is required";
        if (!newBranch.trim()) newErrors.newBranch = "New Branch is required";
        if (!token.trim()) newErrors.token = "PAT Token is required";
        if (!file) newErrors.file = "CSV file is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async () => {
        if (!validateForm()) return;
        setLoading(true)
        const formData = new FormData();
        formData.append("repo_url", repoName);
        formData.append("old_branch", oldBranch);
        formData.append("new_branch", newBranch);
        formData.append("csv_file", file);
        formData.append("token", token);
        const csvString = Papa.unparse(csvData);
        const blob = new Blob([csvString], { type: "text/csv" });
        const updatedFile = new File([blob], file.name, { type: "text/csv" });
                dispatch(gitReleaseNote(formData)).then((response) => {
                    setLoading(false)
                    if (!response) {
                        Swal.fire({
                            title: "error",
                            text: "Something went wrong!",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                })
    };
    const handleDownload = (data, filename) => {
        const extension = filename.split('.').pop();
        const mimeType = extension === 'txt' ? 'text/plain' : 'application/octet-stream';
        const blob = new Blob([data], { type: mimeType });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRephraseReleaseNotes = async () => {
        if (!releaseNotesFeedback.trim()) {
            return;
        }
        const formData = new FormData();
        setLoading(true)
        formData.append("user_input", releaseNotesFeedback);
        dispatch(gitRealseFeedback(formData)).then((response) => {
            if (response.status===200) {setLoading(false)}
            if (!response) {
                // setLoading(false)
                Swal.fire({
                    title: "error",
                    text: "Something went wrong!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        })
    }
    const handleRephraseCommitLogs = async () => {
        if (!commitLogsFeedback.trim()) {
            return;
        }
        const formData = new FormData();
        formData.append("user_input", commitLogsFeedback);
        dispatch(gitCommitFeedback(formData)).then((response) => {
            if (!response) {
                Swal.fire({
                    title: "error",
                    text: "Something went wrong!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        })
    };
    return (
        <Container fluid className="bg-white shadow-md p-0 m-0">
             <div className="mt-3 " style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <h2 className="h5 fw-semibold m-0">Upload Git Release Note</h2>
            </div>
    
            <div className="mt-3 pt-3" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                <Card className="p-4 shadow-sm rounded release-form-card">
                    {loading && <FullScreenLoader />}

                    <Row className=" mb-3">
  <Col xs={12} sm={6} md={6} lg={3}>
    <Form.Group controlId="repoName">
      <Form.Label>Repository URL <span className="text-danger">*</span></Form.Label>
      <Form.Control
        type="text"
        placeholder="Repository Name"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        isInvalid={!!errors.repoName}
      />
      <Form.Control.Feedback type="invalid">
        {errors.repoName}
      </Form.Control.Feedback>
    </Form.Group>
  </Col>

  <Col xs={12} sm={6} md={6} lg={3}>
    <Form.Group controlId="oldBranch">
      <Form.Label>Old Branch <span className="text-danger">*</span></Form.Label>
      <Form.Control
        type="text"
        placeholder="Old Branch"
        value={oldBranch}
        onChange={(e) => setOldBranch(e.target.value)}
        isInvalid={!!errors.oldBranch}
      />
      <Form.Control.Feedback type="invalid">
        {errors.oldBranch}
      </Form.Control.Feedback>
    </Form.Group>
  </Col>

  <Col xs={12} sm={6} md={6} lg={3}>
    <Form.Group controlId="newBranch">
      <Form.Label>New Branch <span className="text-danger">*</span></Form.Label>
      <Form.Control
        type="text"
        placeholder="New Branch"
        value={newBranch}
        onChange={(e) => setNewBranch(e.target.value)}
        isInvalid={!!errors.newBranch}
      />
      <Form.Control.Feedback type="invalid">
        {errors.newBranch}
      </Form.Control.Feedback>
    </Form.Group>
  </Col>

  <Col xs={12} sm={6} md={6} lg={3}>
    <Form.Group controlId="token">
      <Form.Label>PAT <span className="text-danger">*</span></Form.Label>
      <Form.Control
        type="password"
        placeholder="PAT"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        isInvalid={!!errors.token}
      />
      <Form.Control.Feedback type="invalid">
        {errors.token}
      </Form.Control.Feedback>
    </Form.Group>
  </Col>
</Row>


    
                    <div className="mb-4">
                        <Form.Label>Upload Features (CSV) <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="file"
                            accept=".csv"
            
                            onChange={handleFileChange}
                            isInvalid={!!errors.file}
                        />
                        {errors.file && <div className="text-danger mt-1">{errors.file}</div>}
                    </div>
    
                    {csvData.length > 0 && (
                        <div className="mb-4 border rounded p-3">
                            <h5 className="mb-3">Edit CSV Data</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered table-sm">
                                    <thead className="table-light">
                                        <tr>
                                            {Object.keys(csvData[0]).map((header) => (
                                                <th key={header}>{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {csvData.map((row, index) => (
                                            <tr key={index}>
                                                {Object.entries(row).map(([field, value]) => (
                                                    <td key={field}>
                                                        <input
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handleCsvDataChange(index, field, e.target.value)}
                                                            className="form-control form-control-sm"
                                                            style={{ border: 'none', width: '90%' }}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
  <Button
  onClick={handleSubmit}
  className="btn btn-primary btn-sm mb-4 px-3"
  style={{ width: "150px",height:"40px" }}
>
  Submit
</Button>


    
                    {releaseNotes && (
                        <Row className="g-4 mt-3">
                            <Col lg={9}>
                                <Card className="p-3 bg-light border">
                                    <h5 className="mb-3">📄 Release Notes</h5>
                                    <textarea className="form-control bg-dark text-white" rows="10" readOnly value={releaseNotes} />
                                    <Button onClick={() => handleDownload(releaseNotes, "release_notes.txt")} className="btn btn-primary w-100 mt-3">⬇ Download Release Notes</Button>
                                </Card>
                            </Col>
    
                            <Col lg={3}>
                                <Card className="p-3 bg-white border">
                                    <h5 className="mb-3">💬 Feedback</h5>
                                    <textarea className="form-control" rows="10" value={releaseNotesFeedback} onChange={(e) => setReleaseNotesFeedback(e.target.value)} />
                                    <Button onClick={handleRephraseReleaseNotes} className="btn btn-secondary w-100 mt-3">🔁 Rephrase Release Notes</Button>
                                </Card>
                            </Col>
                        </Row>
                    )}
    
                    {commitLogs && (
                        <Row className="g-4 mt-5">
                            <Col lg={9}>
                                <Card className="p-3 bg-light border">
                                    <h5 className="mb-3">📝 Commit Logs Summary</h5>
                                    <textarea className="form-control bg-dark text-white" rows="10" readOnly value={commitLogs} />
                                    <Button onClick={() => handleDownload(commitLogs, "commit_logs_summary.txt")} className="btn btn-primary w-100 mt-3">⬇ Download Commit Logs</Button>
                                </Card>
                            </Col>
                            <Col lg={3}>
                                <Card className="p-3 bg-white border">
                                    <h5 className="mb-3">💬 Feedback</h5>
                                    <textarea className="form-control" rows="10" value={commitLogsFeedback} onChange={(e) => setCommitLogsFeedback(e.target.value)} />
                                    <Button onClick={handleRephraseCommitLogs} className="btn btn-secondary w-100 mt-3">🔁 Rephrase Commit Logs</Button>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Card>
            </div>
        </Container>
    );
    
    
}