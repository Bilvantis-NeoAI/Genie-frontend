import React, { useState, useEffect } from "react";
import { homePage1TextSamples } from "../utils/constatnts";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { repoIngestion } from "../actions/IngestionAction";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { repo_Ingestion, sweetalert } from "../utils/constatnts";
import Swal from "sweetalert2";
import { ingestedRepoList } from "../actions/IngestionAction";
export default function IngestionRepo() {
  const [error, setError] = useState({ url: "" });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [inputFields, setInputFields] = useState({
    branch: "",
    url: "",
    pat: "",
  });
  const FullScreenLoader = () => (
    <div className="loader-overlay">
      <div className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  const dispatch = useDispatch();
  const repoData = useSelector((state) => state.ingestedRepo?.ingestionRepos?.action?.data);
  useEffect(() => {
    dispatch(ingestedRepoList())
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevState) => ({
      ...prevState,
      [name]: value,
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
    const submissionData = {
      ...inputFields,
      branch: branchNames,
    };
    setLoading(true);
    setIsDisable(true);

    dispatch(repoIngestion(submissionData))
      .then((d) => {
        setLoading(false);
        setIsDisable(false);
        if (d.status === 200) {
          Swal.fire({
            title: sweetalert.SUCCESS_TITLE,
            text: repo_Ingestion.INGESTION_INITIATED_SUCCEEFULLY,
            icon: sweetalert.SUCCESS_ICON,
            confirmButtonText: sweetalert.OK_CONFIRMED_TEXT,
          });
        }
      })
      .catch(() => {
        setLoading(false);
        setIsDisable(false);
        Swal.fire({
          title: sweetalert.ERROR_CONFIRMED_TEXT,
          text: repo_Ingestion.ERROR_OCCURED_REPO_INGESTION,
          icon: sweetalert.ERROR_ICON,
          confirmButtonText: sweetalert.ERROR_CONFIRMED_TEXT,
        });
      });
  };
  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto card shadow-lg p-4" style={{ maxWidth: "600px" }}>
            <div className="form-group">
              <div className="mb-4">
                <label className="form-label fw-bold">
                  {homePage1TextSamples.URL_INPUT}
                  <span className="text-danger ms-1">*</span>
                </label>
                <input
                  type="url"
                  name="url"
                  className="form-control"
                  placeholder="Enter the URL"
                  value={inputFields.url}
                  onChange={handleChange}
                />
                {loading && <FullScreenLoader />}
                {error.url && <div className="text-danger mt-1 small">{error.url}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">{homePage1TextSamples.TOKEN}</label>
                <input
                  type="text"
                  name="pat"
                  className="form-control"
                  placeholder="Enter the Token"
                  value={inputFields.pat}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">{homePage1TextSamples.BRANCH_NAME}</label>
                <input
                  type="text"
                  name="branch"
                  className="form-control"
                  placeholder="Enter Branches (comma separated)"
                  value={inputFields.branch}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <Button type="submit" className="btn btn-primary px-4" disabled={isDisable}>
                  {homePage1TextSamples.SUBMIT}
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="table-responsive mt-5 mx-auto" style={{ maxWidth: "800px" }}>
          <h4>Ingested Repositories</h4>

          <table className="table table-bordered table-striped">
            <thead className="table-secondary">
              <tr>
                <th style={{ width: "10%" }}>Sl</th>
                <th style={{ width: "45%" }}>Repo</th>
                <th style={{ width: "45%" }}>Branch</th>
              </tr>
            </thead>
            <tbody>
              {repoData && repoData.repos.length > 0 ? (
                repoData.repos.map((repo, index) =>
                  repo.branches.map((branch, idx) => (
                    <tr key={`${index}-${idx}`}>
                      <td>{index + 1}</td>
                      <td>{repo.repo_name}</td>
                      <td>{branch}</td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </Container>
    </div>
  );
}