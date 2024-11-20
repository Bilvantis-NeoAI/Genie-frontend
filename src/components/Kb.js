import React, { useState } from "react";
import { homePage1TextSamples } from "../utils/constatnts";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "react-bootstrap/Button";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import {Container, Row, Form } from "react-bootstrap";
import Select from "react-select";
import { repoIngestion } from "../actions/IngestionAction";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { repoIngestionStatus } from "../actions/IngestionAction";
export default function Kb() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState({
    url: "",
  });
  const [inputFields, setInputFields] = useState({
    branchName: [],
    url: "",
    token: "",
  });
  let dispatch = useDispatch()
  const branchOptions = [
    { value: "Develop", label: "Develop" },
    { value: "Uat", label: "Uat" },
    { value: "Dev", label: "Dev" },
    { value: "Prod", label: "Prod" },
  ];

  const handleFetchClick = () => {
    if (inputFields.url.trim() === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        url: "URL is required",
      }));
      return;
    }

    setError((prevErrors) => ({ ...prevErrors, url: "" }));
    setShowDropdown(true);
    dispatch(repoIngestion(inputFields))
        .then((response) => {
          if (response.data.Status === 'Success') {
            dispatch(repoIngestionStatus())
            .then((response) => {              
            })
          }
        })
        .catch((error) => {
          toast.error('An error occurred while adding the document.');
        });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOptions) => {
    setInputFields({
      ...inputFields,
      branchName: selectedOptions || [],
    });
  };
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (inputFields.url.trim() === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        url: "URL is required",
      }));
      return;
    } else {
      setError((prevErrors) => ({ ...prevErrors, url: "" }));
    }
  };
  return (
    <div>
      <Container className="w-100" fluid style={{ height: "100vh" }}>
        <Row style={{ height: "10vh" }}>
          <HeaderComponent />
        </Row>
        <div className="w-100 mt-3" style={{ height: "82vh" }}>
          <div style={{ width: "10%" }}>
            <BootstrapSidebar />
          </div>
          <form onSubmit={handleFileSubmit}>
            <div className="col-11 h-100 ms-5 mb-5 pb-4">
              <div
                className="card d-flex h-100 question-card ms-4"
                style={{ overflowY: "scroll" }}
              >
                <div className="form-group d-flex flex-column align-items-center w-100 d-flex mt-5 ms-5">
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
                      <Button
                        className="ms-2 buttons-colour"
                        onClick={handleFetchClick}
                      >
                        Fetch
                      </Button>
                    </div>
                    {error.url && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {error.url}
                      </div>
                    )}
                    <div className="mt-4">
                      <div>
                        <span className="form-field-title">
                          {homePage1TextSamples.TOKEN}
                        </span>
                      </div>
                      <div className="input-container mt-2 d-flex align-items-center">
                        <input
                          type="text"
                          name="token"
                          value={inputFields.token}
                          onChange={handleChange}
                          placeholder="Enter the Token"
                          className="form-control input-box"
                        />
                      </div>
                    </div>
                  </div>

                  {showDropdown && (
                    <div style={{ width: '30%', marginTop: '3%' }}>
                      <div>
                        <span className="form-field-title">
                          Select Branches
                        </span>
                      </div>
                      <Select
                        isMulti
                        options={branchOptions}
                        value={inputFields.branchName}
                        onChange={handleSelectChange}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        placeholder="Select multiple branches"
                        className="input-box"
                      />
                    </div>
                  )}

                  <div style={{ width: '30%', marginTop: '3%' }}>
                    {showDropdown ? (
                      ""
                    ) : (
                      <>
                        <div>
                          <span className="form-field-title">
                            {homePage1TextSamples.BRANCH_NAME}
                          </span>
                        </div>
                        <div className="input-container mt-2 d-flex align-items-center">
                          <input
                            type="text"
                            name="branchName"
                            className="form-control input-box"
                            placeholder="Enter Branches"
                            value={inputFields.branchName}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}
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
      </Container>
    </div>
  );
}
