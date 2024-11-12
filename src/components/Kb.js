import React, { useState } from "react";
import { homePage1TextSamples } from "../utils/constatnts";
import LanguageIcon from "@mui/icons-material/Language";
import Button from "react-bootstrap/Button";
import { BootstrapSidebar } from "./sideNav";
import { HeaderComponent } from "./header";
import { Col, Container, Row, Form } from "react-bootstrap";
import Select from "react-select";

export default function Kb() {
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [branchName, setBranchName] = useState("");
  const branchOptions = [
    { value: "Develop", label: "Develop" },
    { value: "Uat", label: "Uat" },
    { value: "Dev", label: "Dev" },
    { value: "Prod", label: "Prod" },
  ];
  const handleFetchClick = () => {
    setShowDropdown(true);
    setIsMultiSelect(true);
  };

  const handleBranchChange = (selected) => {
    setSelectedBranches(selected);
  };

  const handleBranchNameChange = (e) => {
    setBranchName(e.target.value);
    setSelectedBranches([]);
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
          <div className="col-11 h-100 ms-5 mb-5 pb-4">
            <div
              className="card d-flex h-100 question-card ms-4"
              style={{ overflowY: "scroll" }}
            >
              <div className="form-group d-flex flex-column align-items-center w-100 d-flex mt-5 ms-5">
                <form>
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
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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
                    <div className="mt-4">
                    <div>
                      <span className="form-field-title">
                        {homePage1TextSamples.TOKEN}
                      </span>
                    </div>
                    <div className="input-container mt-2 d-flex align-items-center">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter the URL"
                        className="form-control input-box"
                      />
                      </div>
                      </div>
                  </div>

                  {showDropdown && (
                    <div className="mt-4">
                      <div>
                        <span className="form-field-title">
                          Select Branches
                        </span>
                        <span className="required-styling">*</span>
                      </div>
                      <Select
                        isMulti
                        options={branchOptions}
                        value={selectedBranches}
                        onChange={handleBranchChange}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        placeholder="Select multiple branches"
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    {showDropdown ? (
                      ""
                    ) : (
                      <>
                        <div className="input-box">
                          <span className="form-field-title">
                            {homePage1TextSamples.BRANCH_NAME}
                          </span>
                          <span className="required-styling">*</span>
                        </div>
                        <div className="input-container flex-column">
                          <input
                            type="text"
                            className="form-control input-box mt-2"
                            placeholder="Enter Branches"
                            value={branchName}
                            onChange={handleBranchNameChange}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
