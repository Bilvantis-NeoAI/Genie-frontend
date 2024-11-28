import React, { useState } from "react";
import { homePage1TextSamples } from "../utils/constatnts";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "react-bootstrap/Button";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { repoIngestion } from "../actions/IngestionAction";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { repo_Ingestion } from "../utils/constatnts";
export default function IngestionRepo() {
  const [error, setError] = useState({ url: "" });
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    branch: "",
    url: "",
    pat: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputFields.url.trim()) {
      setError((prevState) => ({ ...prevState, url: repo_Ingestion.URL_REQUIRED }));
      return;
    } else {
      setError((prevState) => ({ ...prevState, url: "" }));
    }
    const branchNames = inputFields.branch
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");
    const submissionData = {
      ...inputFields,
      branch: branchNames,
    };
    setLoading(true)
    dispatch(repoIngestion(submissionData))
      .then((d) => {
        setLoading(false)

        if (d.status == 200) {
          toast.success(repo_Ingestion.INGESTION_INITIATED_SUCCEEFULLY);
        }

      })
      .catch((e) => {
        setLoading(false)

        toast.error(repo_Ingestion.ERROR_OCCURED_REPO_INGESTION);
      });
  };

  return (
    <div>
      <Container fluid className="w-100" style={{ height: "100vh" }}>
        <Row style={{ height: "10vh" }}>
          <HeaderComponent />
        </Row>

        <div className="w-100 mt-3" style={{ height: "82vh" }}>
          <div style={{ width: "10%" }}>
            <BootstrapSidebar />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="col-11 h-100 ms-5 mb-5 pb-4">
              <div
                className="card d-flex h-100 question-card ms-4"
                style={{ overflowY: "scroll" }}
              >
                <div className="form-group d-flex flex-column align-items-center mt-5 ms-5">
                  <div className="mt-4">
                    <div>
                      <span className="form-field-title">
                        {homePage1TextSamples.URL_INPUT}
                      </span>
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
                    {loading && (
                      <div className="loader">
                        <span>Loading...</span>
                      </div>
                    )}
                    {error.url && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {error.url}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 w-30">
                    <div>
                      <span className="form-field-title">
                        {homePage1TextSamples.TOKEN}
                      </span>
                    </div>
                    <div className="input-container mt-2 d-flex align-items-center">
                      <input
                        type="text"
                        name="pat"
                        value={inputFields.token}
                        onChange={handleChange}
                        placeholder="Enter the Token"
                        className="form-control input-box"
                      />
                    </div>
                  </div>
                  <div className="mt-4 w-30">
                    <div>
                      <span className="form-field-title">
                        {homePage1TextSamples.BRANCH_NAME}
                      </span>
                    </div>
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
                  <div className="w-100 d-flex justify-content-center">
                    <Button className="mt-3 buttons-colour" type="submit">
                      {homePage1TextSamples.SUBMIT}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </Container>
    </div>
  );
}
