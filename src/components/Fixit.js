import React, { useState } from "react";
import { homePage1TextSamples } from "../utils/constatnts";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { repoIngestion } from "../actions/IngestionAction";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { repo_Ingestion, sweetalert } from "../utils/constatnts";
import Swal from "sweetalert2";

export default function Fixit() {
    const [error, setError] = useState({ url: "" });
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [files, setFiles] = useState({
        file1: null,
        file2: null,
        file3: null,
    });
    const [inputFields, setInputFields] = useState({
        branch: "",
        url: "",
        pat: "",
        file1: null,
        file2: null,
        file3: null,
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setInputFields((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setInputFields((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputFields?.url?.trim()) {
            setError((prevState) => ({ ...prevState, url: repo_Ingestion.URL_REQUIRED }));
            return;
        } else {
            setError((prevState) => ({ ...prevState, url: "" }));
        }

        const branchNames = inputFields?.branch
            .split(",")
            .map((name) => name?.trim())
            .filter((name) => name !== "");

        const formData = new FormData();
        formData.append("url", inputFields.url);
        formData.append("pat", inputFields.pat);
        formData.append("branch", JSON.stringify(branchNames));

        // Add files to form data if they exist
        if (inputFields.file1) formData.append("file1", inputFields.file1);
        if (inputFields.file2) formData.append("file2", inputFields.file2);
        if (inputFields.file3) formData.append("file3", inputFields.file3);

        setLoading(true);
        setIsDisable(true);

        // dispatch(repoIngestion(formData))
        //     .then((d) => {
        //         setLoading(false);
        //         setIsDisable(false);
        //         if (d.status === 200) {
        //             Swal.fire({
        //                 title: sweetalert.SUCCESS_TITLE,
        //                 text: repo_Ingestion.INGESTION_INITIATED_SUCCEEFULLY,
        //                 icon: sweetalert.SUCCESS_ICON,
        //                 confirmButtonText: sweetalert.OK_CONFIRMED_TEXT,
        //             });
        //         }
        //     })
        //     .catch((e) => {
        //         setLoading(false);
        //         setIsDisable(false);
        //         Swal.fire({
        //             title: sweetalert.ERROR_CONFIRMED_TEXT,
        //             text: repo_Ingestion.ERROR_OCCURED_REPO_INGESTION,
        //             icon: sweetalert.ERROR_ICON,
        //             confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT
        //         });
        //     });
    };

    return (
        <div>
            <Container fluid className="w-100">
                <form onSubmit={handleSubmit}>
                    <div className="col-10 h-100 ms-5 mb-5 pb-4">
                        <div className="card d-flex h-100 question-card ms-5">
                            {/* <div className="form-group d-flex flex-column align-items-center mt-5 ms-5">
                <div className="mt-2">
                  <div>
                    <span className="form-field-title">{homePage1TextSamples.URL_INPUT}</span>
                    <span className="required-styling">*</span>
                  </div>
                  <div className="input-container mt-2 d-flex align-items-center">
                    <div className="icon-container">
                      <LanguageIcon />
                    </div>
                    <input
                      type="url"
                      onChange={handleChange}
                      name="url"
                      value={inputFields.url}
                      placeholder="Enter the URL"
                      className="form-control input-box"
                    />
                  </div>
                  {loading && <div className="loader"><span>Loading...</span></div>}
                  {error.url && <div className='errorMessage' style={{ color: 'red' }}>{error.url}</div>}
                </div>
                <div className="mt-4 w-30">
                  <div><span className="form-field-title">{homePage1TextSamples.TOKEN}</span></div>
                  <div className="input-container mt-2 d-flex align-items-center">
                    <input
                      type="text"
                      name="pat"
                      value={inputFields.pat}
                      onChange={handleChange}
                      placeholder="Enter the Token"
                      className="form-control input-box"
                    />
                  </div>
                </div>
                <div className="mt-4 w-30">
                  <div><span className="form-field-title">{homePage1TextSamples.BRANCH_NAME}</span></div>
                  <div className="input-container mt-2 d-flex align-items-center">
                    <input
                      type="text"
                      name="branch"
                      className="form-control input-box"
                      placeholder="Enter Branches (comma separated)"
                      value={inputFields.branch}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-4 w-30">
                  <div><span className="form-field-title">Upload File 1</span></div>
                  <input type="file" name="file1" onChange={handleChange} className="form-control" />
                </div>

                <div className="mt-4 w-30">
                  <div><span className="form-field-title">Upload File 2</span></div>
                  <input type="file" name="file2" onChange={handleChange} className="form-control" />
                </div>

                <div className="mt-4 w-30">
                  <div><span className="form-field-title">Upload File 3</span></div>
                  <input type="file" name="file3" onChange={handleChange} className="form-control" />
                </div>
                <div className="w-100 d-flex justify-content-center">
                  <Button className="mt-3 buttons-colour" type="submit" disabled={isDisable}>
                    {homePage1TextSamples.SUBMIT}
                  </Button>
                </div>
              </div> */}
                            <Row className="justify-content-center mt-5">
                                <Col md={5}>
                                    <div className="card shadow-sm p-4">
                                        <h5 className="mb-4 text-primary">Repository Details</h5>

                                        <div className="form-group mb-3">
                                            <label className="form-field-title">
                                                {homePage1TextSamples.URL_INPUT} <span className="required-styling">*</span>
                                            </label>
                                            <div className="input-container d-flex align-items-center mt-2">
                                                <div className="icon-container me-2"><LanguageIcon /></div>
                                                <input
                                                    type="url"
                                                    onChange={handleChange}
                                                    name="url"
                                                    value={inputFields.url}
                                                    placeholder="Enter the URL"
                                                    className="form-control"
                                                />
                                            </div>
                                            {loading && <div className="loader mt-2"><span>Loading...</span></div>}
                                            {error.url && <div className="text-danger mt-1">{error.url}</div>}
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-field-title">{homePage1TextSamples.TOKEN}</label>
                                            <input
                                                type="text"
                                                name="pat"
                                                value={inputFields.pat}
                                                onChange={handleChange}
                                                placeholder="Enter the Token"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-field-title">{homePage1TextSamples.BRANCH_NAME}</label>
                                            <input
                                                type="text"
                                                name="branch"
                                                className="form-control"
                                                placeholder="Enter Branches (comma separated)"
                                                value={inputFields.branch}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </Col>

                                <Col md={5}>
                                    <div className="card shadow-sm p-4">
                                        <h5 className="mb-4 text-primary">Upload Files</h5>

                                        <div className="form-group mb-3">
                                            <input
                                                type="file"
                                                name="file1"
                                                onChange={handleFileChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                type="file"
                                                name="file2"
                                                onChange={handleFileChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input
                                                type="file"
                                                name="file3"
                                                onChange={handleFileChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-center mb-5">
                                <Button className="mt-4 px-5 buttons-colour" type="submit" disabled={isDisable}>
                                    {homePage1TextSamples.SUBMIT}
                                </Button>
                            </div>

                        </div>
                    </div>
                </form>
                <ToastContainer />
            </Container>
        </div>
    );
}
